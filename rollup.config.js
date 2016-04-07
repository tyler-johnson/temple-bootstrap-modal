import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import path from "path";
import {compile} from "templejs-compiler";

export default {
	onwarn: ()=>{},
	format: "cjs",
	moduleName: "BootstrapModal",
	plugins: [
		{
			transform: function(src, id) {
				if (path.extname(id) !== ".html") return;

				let out = compile(src, {
					format: "es6",
					filename: id
				});

				out.map = out.map.toJSON();

				return out;
			}
		},

		json(),

		babel({
			exclude: [ "node_modules/**" ],
			include: [ "src/**" ],
			presets: [ "es2015-rollup" ],
			plugins: [ "transform-object-rest-spread" ]
		})
	]
};
