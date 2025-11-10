import { useState, useEffect, MouseEvent } from "react";
import * as HorneroVoting from "hornero_voting";
import { useWallet } from "./hooks/useWallet";
import { connectWallet, disconnectWallet } from "./util/wallet";
import { rpcUrl } from "./contracts/util";

interface Project {
  id: number;
  name: string;
  votes: number;
}

export default function App() {
  const { address, signTransaction } = useWallet();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votePoints, setVotePoints] = useState(5);

  const readClient = new HorneroVoting.Client({
    networkPassphrase: 'Test SDF Network ; September 2015',
    contractId: 'CDDQIFGPMPYNLEVBYP4XXESYB6R52BNH6KKK26BZXUMCJLPGPO4CWQVF',
    rpcUrl,
    allowHttp: true,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const result = await readClient.get_top_projects({ limit: 10 });
      setProjects(result.result || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!address || !signTransaction) {
      alert("Connect your wallet first");
      return;
    }
    if (!projectName.trim()) return;

    try {
      setIsRegistering(true);
      const writeClient = new HorneroVoting.Client({
        networkPassphrase: 'Test SDF Network ; September 2015',
        contractId: 'CDDQIFGPMPYNLEVBYP4XXESYB6R52BNH6KKK26BZXUMCJLPGPO4CWQVF',
        rpcUrl,
        allowHttp: true,
        publicKey: address,
        signTransaction,
      });

      const tx = await writeClient.register_project({
        owner: address,
        name: projectName,
      });

      await tx.signAndSend();
      alert(`Project "${projectName}" registered!`);
      setProjectName("");
      await loadProjects();
    } catch (err: any) {
      console.error("Error registering:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsRegistering(false);
    }
  }

  async function handleVote(projectId: number) {
    if (!address || !signTransaction) {
      alert("Connect your wallet first");
      return;
    }

    try {
      setIsVoting(true);
      const writeClient = new HorneroVoting.Client({
        networkPassphrase: 'Test SDF Network ; September 2015',
        contractId: 'CDDQIFGPMPYNLEVBYP4XXESYB6R52BNH6KKK26BZXUMCJLPGPO4CWQVF',
        rpcUrl,
        allowHttp: true,
        publicKey: address,
        signTransaction,
      });

      const tx = await writeClient.vote({
        judge: address,
        project_id: projectId,  
        points: votePoints,
      });

      await tx.signAndSend();
      alert(`Vote of ${votePoints} points registered!`);
      await loadProjects();
    } catch (err: any) {
      console.error("Error voting:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsVoting(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    window.location.reload();
  };

  const handleMouseOver = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLElement;
    if (target.style.transform) target.style.transform = "translateY(-8px)";
    if (target.style.boxShadow) target.style.boxShadow = "0 20px 40px rgba(255, 215, 0, 0.4)";
    if (target.style.borderColor) target.style.borderColor = "rgba(255, 215, 0, 0.5)";
  };

  const handleMouseOut = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "translateY(0)";
    target.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    target.style.borderColor = "rgba(255, 255, 255, 0.1)";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#ffffff"
    }}>

      <header style={{
        padding: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: 800,
            background: "linear-gradient(45deg, #FFD700, #FFA500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0
          }}>
            HorneroHub
          </h1>

          {!address ? (
            <button
              onClick={connectWallet}
              style={{
                background: "linear-gradient(45deg, #FFD700, #FFA500)",
                color: "#000",
                border: "none",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(255, 215, 0, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(255, 215, 0, 0.3)";
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                padding: "12px 20px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFD700",
                border: "1px solid rgba(255, 215, 0, 0.3)"
              }}>
                {address.slice(0, 8)}...{address.slice(-4)}
              </div>
              <button
                onClick={handleDisconnect}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ff6b6b",
                  border: "1px solid rgba(255, 107, 107, 0.3)",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <section style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{
            fontSize: "clamp(48px, 8vw, 72px)",
            fontWeight: 900,
            background: "linear-gradient(45deg, #FFD700, #FFA500, #FF8C00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Let's Build Together
          </h2>
          <p style={{ fontSize: "clamp(18px, 3vw, 24px)", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "20px auto" }}>
            Hackathons, voting and rewards on Stellar
          </p>
        </section>

        {address && (
          <section style={{ marginBottom: "60px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
              {/* Register */}
              <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                padding: "40px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>Create</div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px", color: "#FFD700" }}>
                  Create Your Project
                </h3>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Project name"
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    marginBottom: "16px",
                    color: "white"
                  }}
                />
                <button
                  onClick={handleRegister}
                  disabled={isRegistering || !projectName.trim()}
                  style={{
                    width: "100%",
                    background: "linear-gradient(45deg, #FFD700, #FFA500)",
                    color: "#000",
                    padding: "16px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {isRegistering ? "Registering..." : "Register Project"}
                </button>
              </div>

              {/* Vote */}
              <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                padding: "40px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>Vote</div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#FFD700" }}>
                  Configure Your Vote
                </h3>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={votePoints}
                  onChange={(e) => setVotePoints(Number(e.target.value))}
                  style={{ width: "100%", margin: "30px 0" }}
                />
                <div style={{ fontSize: "48px", fontWeight: 900, color: "#FFD700" }}>
                  {votePoints} stars
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 800, color: "#FFD700", textAlign: "center", marginBottom: "40px" }}>
            Active Projects
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px" }}>Loading...</div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "20px" }}>
              No projects yet. Be the first!
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    padding: "30px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(255, 215, 0, 0.1)",
                    color: "#FFD700",
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderBottomLeftRadius: "12px"
                  }}>
                    #{i + 1}
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", paddingRight: "60px" }}>
                    {p.name}
                  </h3>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#FFD700" }}>
                    {p.votes} votes
                  </div>
                  {address && (
                    <button
                      onClick={() => handleVote(p.id)}
                      disabled={isVoting}
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        background: "linear-gradient(45deg, #FFD700, #FFA500)",
                        color: "#000",
                        padding: "14px",
                        borderRadius: "12px",
                        fontWeight: 700
                      }}
                    >
                      {isVoting ? "Voting..." : `Vote ${votePoints} stars`}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer style={{
        background: "rgba(0, 0, 0, 0.3)",
        padding: "40px 20px",
        marginTop: "80px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, color: "#FFD700" }}>
          We build like Horneros — one brick at a time
        </p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
          Powered by Stellar & Soroban
        </p>
      </footer>
    </div>
  );
}