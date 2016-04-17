/* globals jQuery */
import "./layout.html";
import {merge} from "lodash";
import Temple from "templejs";

export function createContainer(data={}) {
	let {id,className} = data;
	let cont = document.createElement("div");
	if (id) cont.id = id;
	cont.classList.add("modal", "fade");
	if (className) cont.classList.add(className);
	return cont;
}

export function create(node, data={}) {
	if (node && !node.nodeType) [data,node] = [node,null];

	let cont = createContainer(data);
	data = merge({
		form: false,
		header: true,
		footer: true,
		close: true,
		confirm: false,
		destroyOnHide: true
	}, data);

	let comp = Temple.paint("bs-modal-content", cont, data);

	let $el = comp.$el = jQuery(cont);
	comp.container = cont;

	comp.appendTo = function(node) {
		if (typeof node === "string") node = document.querySelector(node);
		node.appendChild(cont);
		return comp;
	};

	comp.show = function(node) {
		if (node) comp.appendTo(node);
		else if (!comp.container.parentNode) comp.appendTo("body");
		$el.modal("show");
		return comp;
	};

	comp.hide = function() {
		$el.modal("hide");
		return comp;
	};

	comp.destroy = function() {
		comp.stop();
		if (cont.parentNode) {
			cont.parentNode.removeChild(cont);
		}
	};

	$el.on("hidden.bs.modal", function() {
		if (data.destroyOnHide) comp.destroy();
	});

	if (node) comp.appendTo(node);

	return comp;
}

export function open(node, data) {
	if (node && !node.nodeType) [data,node] = [node,null];
	let modal = create(node, data);
	modal.show();
	return modal;
}

export function confirm(msg, data, fn) {
	if (typeof data === "function") [fn,data] = [data,{}];

	return open(document.body, merge({
		content: msg,
		onconfirm: fn,
		header: false,
		footer: {
			close: "Cancel",
			confirm: { className: "btn-primary", text: "Okay" }
		},
		className: "modal-confirm"
	}, data));
}
