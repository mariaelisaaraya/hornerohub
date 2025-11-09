#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, String, Vec,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Project {
    pub id: u32,
    pub name: String,
    pub owner: Address,
    pub votes: u32,
}

#[contracttype]
pub enum DataKey {
    Admin,
    ProjectCount,
    Project(u32),
    HasVoted(Address, u32),
    Judge(Address),
    VotingOpen,
    ProjectsByOwner(Address),
}

#[contract]
pub struct HorneroContract;

#[contractimpl]
impl HorneroContract {
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::ProjectCount, &0u32);
        env.storage().instance().set(&DataKey::VotingOpen, &true);
    }

    pub fn register_project(env: Env, owner: Address, name: String) -> u32 {
        owner.require_auth();
        Self::require_voting_open(&env);

        let owner_key = DataKey::ProjectsByOwner(owner.clone());
        let owner_count: u32 = env.storage().instance().get(&owner_key).unwrap_or(0);
        if owner_count >= 3 {
            panic!("Max 3 projects per owner");
        }

        let mut count: u32 = env.storage()
            .instance()
            .get(&DataKey::ProjectCount)
            .expect("Not initialized");

        count += 1;

        let project = Project {
            id: count,
            name: name.clone(),
            owner: owner.clone(),
            votes: 0,
        };

        env.storage().instance().set(&DataKey::Project(count), &project);
        env.storage().instance().set(&DataKey::ProjectCount, &count);
        env.storage().instance().set(&owner_key, &(owner_count + 1));

        count
    }

    pub fn add_judge(env: Env, admin: Address, judge: Address) {
        admin.require_auth();
        Self::require_admin(&env, &admin);
        Self::require_voting_open(&env);

        env.storage().instance().set(&DataKey::Judge(judge.clone()), &true);
    }

    pub fn vote(env: Env, judge: Address, project_id: u32, points: u32) {
        judge.require_auth();
        Self::require_voting_open(&env);

        if !env.storage().instance().get::<_, bool>(&DataKey::Judge(judge.clone())).unwrap_or(false) {
            panic!("Not a judge");
        }

        if env.storage().instance().get::<_, bool>(&DataKey::HasVoted(judge.clone(), project_id)).unwrap_or(false) {
            panic!("Already voted");
        }

        if !(1..=5).contains(&points) {
            panic!("Points 1-5");
        }

        let mut project: Project = env.storage()
            .instance()
            .get(&DataKey::Project(project_id))
            .expect("Project not found");

        project.votes += points;

        env.storage().instance().set(&DataKey::Project(project_id), &project);
        env.storage().instance().set(&DataKey::HasVoted(judge.clone(), project_id), &true);
    }

    pub fn close_voting(env: Env, admin: Address) {
        admin.require_auth();
        Self::require_admin(&env, &admin);
        env.storage().instance().set(&DataKey::VotingOpen, &false);
    }

    // VERSIÓN CORREGIDA PARA SOROBAN v23
    pub fn get_top_projects(env: Env, limit: u32) -> Vec<Project> {
        let count = Self::get_project_count(env.clone());
        let mut projects = Vec::<Project>::new(&env);

        // Cargar todos los proyectos
        for i in 1..=count {
            if let Some(p) = env.storage().instance().get::<_, Project>(&DataKey::Project(i)) {
                projects.push_back(p);
            }
        }

        let len = projects.len() as u32;
        if len <= 1 || limit == 0 {
            return Self::take_first(&projects, limit.min(len));
        }

        // Bubble sort SIN .swap() → usamos get + set ¡Importante! Lo vimos en la cursada
        let mut swapped = true;
        let mut n = len;
        while swapped && n > 1 {
            swapped = false;
            for i in 1..n {
                let a = projects.get(i - 1).unwrap();
                let b = projects.get(i).unwrap();
                if a.votes < b.votes {
                    projects.set(i - 1, b);
                    projects.set(i, a);
                    swapped = true;
                }
            }
            n -= 1;
        }

        Self::take_first(&projects, limit.min(len))
    }

    // Helper para devolver solo los primeros N
    fn take_first(projects: &Vec<Project>, limit: u32) -> Vec<Project> {
        let mut result = Vec::new(&projects.env());
        let max_take = limit.min(projects.len() as u32);
        for i in 0..max_take {
            if let Some(p) = projects.get(i) {
                result.push_back(p);
            }
        }
        result
    }

    pub fn get_results(env: Env) -> Vec<Project> {
        Self::get_top_projects(env, 50) // por defecto top 50
    }

    // Getters
    pub fn get_project(env: Env, project_id: u32) -> Option<Project> {
        env.storage().instance().get(&DataKey::Project(project_id))
    }

    pub fn get_project_count(env: Env) -> u32 {
        env.storage().instance().get(&DataKey::ProjectCount).unwrap_or(0)
    }

    pub fn voting_is_open(env: Env) -> bool {
        env.storage().instance().get(&DataKey::VotingOpen).unwrap_or(false)
    }

    pub fn is_judge(env: Env, address: Address) -> bool {
        env.storage().instance().get::<_, bool>(&DataKey::Judge(address)).unwrap_or(false)
    }

    // Helpers
    fn require_admin(env: &Env, admin: &Address) {
        let stored: Address = env.storage().instance().get(&DataKey::Admin).expect("No admin");
        if *admin != stored {
            panic!("Only admin");
        }
    }

    fn require_voting_open(env: &Env) {
        if !Self::voting_is_open(env.clone()) {
            panic!("Voting closed");
        }
    }
}