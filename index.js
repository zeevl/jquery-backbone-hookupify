var through = require('through');

function hookupBbJs(buf) {
  // find $ = require('jquery'); or similar, in coffee or js
	var jq = /([\S]+)\s*=\s*require\(*'jquery'\)*(;*)/.exec(buf);

	//add the line Backbone.$ = $ following require('backbone')
	return jq == null ? buf : 
		buf.replace(
			/([\S]+)\s*=\s*require\(*'backbone'\)*;*/, 
			"$&\n$1.$ = " + jq[1] + jq[2]);
}

module.exports = function(file) {
	var buf = '';
	return through(write, end);

	function write(data) {
		buf += data;
	}

	function end() {
		this.queue(hookupBbJs(buf));
		this.queue(null);
	}
}