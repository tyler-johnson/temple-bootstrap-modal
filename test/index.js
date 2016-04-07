import test from "tape";

// prep bootstrap
global.jQuery = require("jquery");
global.Tether = require("tether");
require("bootstrap");

const BootstrapModal = require("./");

test("opens modal", (t) => {
	t.plan(5);
	let modal = BootstrapModal.open(document.body);

	let el = document.body.querySelector(".modal");
	t.ok(el, "body contains modal element");
	t.ok(el.querySelector(".modal-body"), "modal has body element");
	t.ok(el.querySelector(".modal-header"), "modal has header element");
	t.ok(el.querySelector(".modal-footer"), "modal has footer element");

	modal.$el.on("shown.bs.modal", function() {
		t.pass("opened the modal");
		modal.destroy();
	});
});

test("removes modal on hide", (t) => {
	t.plan(4);
	let modal = BootstrapModal.open(document.body);
	let el = modal.container;
	t.ok(document.body.contains(el), "body does contains modal element");

	modal.$el.on("shown.bs.modal", function() {
		t.pass("opened the modal");
		modal.hide();
	});

	modal.$el.on("hidden.bs.modal", function() {
		t.pass("hid the modal");
		t.notOk(document.body.contains(el), "body does not contain modal element");
	});
});
