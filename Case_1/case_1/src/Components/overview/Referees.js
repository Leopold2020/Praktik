import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Referees({ referees }) {
  const [copied, setCopied] = useState(false);
  const [textToCopy, setTextToCopy] = useState("");

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="column">
      {/* <h1>Referees</h1> */}
      {referees !== null ? (
        <table className="table">
          <tbody>
            <tr>
              {/* <td>Referee ID</td> */}
              <td>Name:</td>
              <td>Email:</td>
              <td>Phone:</td>
              <td>Bank number:</td>
              <td>
                Bank clearing:
              </td>
            </tr>
            {referees.map((referee) => (
              <tr key={referee.id} className="card">
                {/* <td>{referee.id}</td> */}
                <td>{referee.username}</td>
                <td>{referee.email}</td>
                <td>{referee.phone}</td>
                <td>
                  {referee.bank_number}
                  <> </>
                  {referee.bank_number != null ? (
                    <CopyToClipboard
                      text={referee.bank_number}
                      onCopy={onCopy}
                    >
                      <button onClick={() => setTextToCopy("Copied")}>
                        Copy
                      </button>
                    </CopyToClipboard>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                {referee.bank_clering}
                  <> </>
                  {referee.bank_clering != null ? (
                    <CopyToClipboard
                      text={referee.bank_clering}
                      onCopy={onCopy}
                    >
                      <button onClick={() => setTextToCopy("Copied")}>
                        Copy
                      </button>
                    </CopyToClipboard>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No referees found</h3>
      )}
    </div>
  );
}

export default Referees;
