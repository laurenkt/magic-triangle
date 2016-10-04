import React       from "react";
import { connect } from "react-redux";
import { getResultTree }
                   from "../reducers/results";

const mapStateToProps = (state, ownProps) => ({
	results: ownProps.results.valueSeq().map(r => getResultTree(state.results, r.get("id"))),
});

const treeToArray = tree => {
	if (tree.children.length === 0)
		return [tree];
	else
		return ([tree]).concat(treeToArray(tree.children[0]));
};

const Col = ({result, of_n}) =>
	<td colSpan={4 - of_n}>
		<table>
			<tbody>
				<tr><th>{result.selected[0]}</th><td>{Math.round(result.ratios[0] * 100)}%</td></tr>
				<tr><th>{result.selected[1]}</th><td>{Math.round(result.ratios[1] * 100)}%</td></tr>
				<tr><th>{result.selected[2]}</th><td>{Math.round(result.ratios[2] * 100)}%</td></tr>
				<tr><th>Severity</th><td>{Math.round(result.severity * 100)}%</td></tr>
			</tbody>
		</table>
	</td>;

Col.propTypes = {
	result: React.PropTypes.object.isRequired,
	of_n:   React.PropTypes.number.isRequired,
};

const Row = ({ results, idx }) =>
	<tr>
		<th className="index">{idx + 1}</th>
		{results.map(result =>
			<Col key={result.id} result={result} of_n={results.length} />)}
	</tr>;

Row.propTypes = {
	results: React.PropTypes.object.isRequired,
	idx:     React.PropTypes.number.isRequired,
};

const Table = ({results}) =>
	<table>
		<tbody>
			{results.map((result, idx) =>
				<Row key={result.id} idx={idx} results={treeToArray(result)} />)}
		</tbody>
	</table>;

Table.propTypes = {
	results: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Table);
