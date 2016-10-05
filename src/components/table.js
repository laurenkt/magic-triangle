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

const Col = ({result}) =>
	<td className="table-container">
		<table>
			{result.title &&
				<caption>{result.title}</caption>}
			<tbody>
				<tr><td>{result.selected[0]}</td><td>{Math.round(result.ratios[0] * 100)}%</td></tr>
				<tr><td>{result.selected[1]}</td><td>{Math.round(result.ratios[1] * 100)}%</td></tr>
				<tr><td>{result.selected[2]}</td><td>{Math.round(result.ratios[2] * 100)}%</td></tr>
				<tr><th>Overall severity</th><th>{Math.round(result.severity * 100)}%</th></tr>
			</tbody>
		</table>
	</td>;

Col.propTypes = {
	result: React.PropTypes.object.isRequired,
};

const Row = ({ results, idx }) =>
	<tr>
		<th className="index">{idx + 1}</th>
		{results.filter(r => typeof r.ratios !== "undefined").map(result => <Col key={result.id} result={result} />)
			.concat(Array.from(Array(3 - results.filter(r => typeof r.ratios !== "undefined").length).keys()).map(idx => <td key={"empty" + idx}></td>))}
	</tr>;

Row.propTypes = {
	results: React.PropTypes.array.isRequired,
	idx:     React.PropTypes.number.isRequired,
};

const Table = ({results}) =>
	<table>
		<thead>
			<tr><td></td><th>Level 1</th><th>Level 2</th><th>Level 3</th></tr>
		</thead>
		<tbody>
			{results.map((result, idx) =>
				<Row key={result.id} idx={idx} results={treeToArray(result)} />)}
		</tbody>
	</table>;

Table.propTypes = {
	results: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Table);
