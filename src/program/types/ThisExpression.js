import Node from '../Node.js';

export default class ThisExpression extends Node {
	initialise () {
		const lexicalBoundary = this.findLexicalBoundary();
		const arrowFunction = this.findNearest( /ArrowFunctionExpression/ );

		if ( arrowFunction && arrowFunction.depth > lexicalBoundary.depth ) {
			const thisAlias = lexicalBoundary.getThisAlias();
			if ( thisAlias ) this.alias = thisAlias;
		}
	}

	transpile () {
		if ( this.alias ) {
			this.program.magicString.overwrite( this.start, this.end, this.alias );
		}
	}
}