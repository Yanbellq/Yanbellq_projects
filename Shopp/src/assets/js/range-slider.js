var inputLeft = document.getElementById("range-left");
var inputRight = document.getElementById("range-right");

var thumbLeft = document.querySelector(".filter__range-slider-thumb.left");
var thumbRight = document.querySelector(".filter__range-slider-thumb.right");
var range = document.querySelector(".filter__range-slider-range");

function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbLeft.style.left = percent + "%";
	range.style.left = percent + "%";
}
setLeftValue();

function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbRight.style.right = (100 - percent) + "%";
	range.style.right = (100 - percent) + "%";
}
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function () {
	thumbLeft.classList.add("hover");
});
inputLeft.addEventListener("mouseout", function () {
	thumbLeft.classList.remove("hover");
});
inputLeft.addEventListener("mousedown", function () {
	thumbLeft.classList.add("active");
});
inputLeft.addEventListener("mouseup", function () {
	thumbLeft.classList.remove("active");
});

inputRight.addEventListener("mouseover", function () {
	thumbRight.classList.add("hover");
});
inputRight.addEventListener("mouseout", function () {
	thumbRight.classList.remove("hover");
});
inputRight.addEventListener("mousedown", function () {
	thumbRight.classList.add("active");
});
inputRight.addEventListener("mouseup", function () {
	thumbRight.classList.remove("active");
});

console.log('hello');