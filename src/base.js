import {registerType,idom} from "templejs";
import {forEach,omit} from "lodash";

export default registerType("bs-modal-base", function() {
	this.use("actions");
	this.decorate("absorb-attrs", function(d, obj, toOmit) {
		if (!obj || typeof obj !== "object") return;
		toOmit = [].concat(toOmit, ["text","className"]).filter(Boolean);
		forEach(omit(obj, toOmit), function(value, name) {
			idom.updateAttribute(d.target, name, value);
		});
	});
});
