<script setup>
	let ondrag = false;
	const startXY = {
		x: 0, y: 0,
	};
	const originXY = {
		x: 0, y: 0,
	};
	let dragTarget = null;
	let startAngle = 0;

	// feature bindings
	const elements = Array.prototype.slice.call(document.getElementsByClassName('rotatable'));
	console.log(elements);
	const computeAngle = (point, origin) => {
		const dx = point.x - origin.x;
		const dy = origin.y - point.y;

		let radians = 0;
		if (dx || dy) radians = Math.atan2(dx, dy);
		// if (radians < 0) radians += 2 * Math.PI;

		return radians;
	};
	const mousemoveHandler = (event) => {
		const currentXY = {
			x: event.clientX,
			y: event.clientY,
		};

		const currentAngle = computeAngle(currentXY, originXY);
		const rotation = currentAngle - startAngle;
		dragTarget.style.transform = `rotate(${rotation}rad)`;
		// console.log('mousemove:', rotation, 'rad', rotation * 360 / (2 * Math.PI), 'degrees');
	};
	const mouseupHandler = (event) => {
		ondrag = false;
		dragTarget = null;

		window.removeEventListener('mousemove', mousemoveHandler);
		window.removeEventListener('mouseup', mouseupHandler);
		// console.log('mouseup, drag done');
	};
	const stopSelect = (e) => {
		if (e.stopPropagation) e.stopPropagation();
		e.cancelBubble = true;
		// if (e.preventDefault) e.preventDefault();
		// e.returnValue = false;
		return false;
	};
	elements.forEach((e) => {
		e.addEventListener('mousedown', (event) => {
			ondrag = true;
			startXY.x = event.clientX;
			startXY.y = event.clientY;
			const viewportOffset = e.getBoundingClientRect();
			originXY.x = viewportOffset.left + e.clientLeft + e.clientWidth / 2;
			originXY.y = viewportOffset.top + e.clientTop + e.clientHeight / 2;
			dragTarget = event.currentTarget;
			startAngle = computeAngle(startXY, originXY);

			// disable selection, to capture mousemove properly (use css)
			// dragTarget.style.userSelect = 'none';

			// trace drag on window object, don't care mouse outside browser or not
			window.addEventListener('mousemove', mousemoveHandler);
			window.addEventListener('mouseup', mouseupHandler);

			console.log('drag start\n', startXY, originXY, '\n', startAngle * 360 / (2 * Math.PI), 'degrees');
			return stopSelect(event);
		});
	});
</script>
<template>
  <div class="container" ref="container">
    <ul class="wheel">
      <li><router-link v-bind:to="test">linkName1</router-link></li>
      <li><router-link v-bind:to="test">linkName2</router-link></li>
      <li><router-link v-bind:to="test">linkName3</router-link></li>
      <li><router-link v-bind:to="test">linkName4</router-link></li>
      <li><router-link v-bind:to="test">linkName5</router-link></li>
    </ul>
  </div>
</template>
<style lang="scss">
@import "~/mixin/br/mixin.scss";
.container {
  width: 100%;
  height: 100vh;
}

.wheel {
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.5);
  .wheel__content {
    position: fixed;
    left:50%;
    bottom: rem(-100);
    transform: translate(-50%,0);
    max-width: rem(400);
    max-height: rem(400);
    width: 70vw;
    height: 70vw;
    background-color: #f00;
    border-radius: 100%;
    text-align: center;
    &::before {
      content: "돌아라";
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: rem(100);
      height: rem(100);
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      border-radius: 100%;
    }
    .wheel__item {
      position:absolute;
    }
  }
}
</style>