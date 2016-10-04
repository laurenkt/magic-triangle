import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import reducer from "./reducers/index.js";
import { addResult }   from "./reducers/results.js";
import { finishQuiz }  from "./reducers/gui.js";
import Set   from "./components/set.js";
import Table from "./components/table.js";

require("./style.scss");

let store = createStore(reducer);

const getRootResults = results =>
	results.filter(r => !r.has("parent"));

const mapStateToProps = ({results, gui}) => {
	return {
		results:  getRootResults(results),
		finished: gui.get("finished"),
	};
};

const mapDispatchToProps = {
	onClick:  addResult,
	onFinish: finishQuiz,
};

const MagicTriangle = connect(mapStateToProps, mapDispatchToProps)(({results, finished, onClick, onFinish}) =>
	<div>
		{!finished &&
			<div>
				<div className="magic-triangle">
					{results.valueSeq().map(r => <Set key={r.get("id")} root={r.get("id")} />)}
				</div>
				<p>If you're done you can:</p>
				<p><button onClick={onClick}>Tell us about another problem</button> or <button onClick={onFinish}>Finish the questionnaire</button></p>
			</div>}
		{finished &&
			<Table results={results} />}
	</div>
);

document.addEventListener("DOMContentLoaded", _ => {
	ReactDOM.render(<Provider store={store}><MagicTriangle /></Provider>, document.getElementById("magicTriangle"));
});
