import { ChangeEvent, useState } from "react";
import "./ask-mcp.css";
import { notify } from "../../../utils/notify";
import { gptService } from "../../../services/gpt-service";
import { Spinner } from "../../shared-area/spinner/spinner";

export function AskMcp() {

    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [fetching, setFetching] = useState<boolean>(false);

    function handleChange(args: ChangeEvent<HTMLInputElement>) {
        setQuestion(args.target.value);
    }

    async function send() {
        try {
            setFetching(true);
            const answer = await gptService.getCompletion(question);
            setAnswer(answer);
        }
        catch (err: any) {
            notify.error(err);
        }
        finally {
            setFetching(false);
        }
    }

    return (
        <div className="AskMcp">

            <label>Ask anything about our orders: </label>
            <br />
            <input type="text" onChange={handleChange} />
            <button onClick={send}>Send</button>
            <hr />

            {fetching && <Spinner />}

            {!fetching && answer}

        </div>
    );
}
