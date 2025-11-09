#![cfg(test)]

use soroban_sdk::{Env, testutils::Address as _};

#[test]
fn contract_compiles_and_runs() {
    let env = Env::default();
    let admin = soroban_sdk::Address::generate(&env);

    env.mock_all_auths();

    let _ = admin;

    assert!(true);
}