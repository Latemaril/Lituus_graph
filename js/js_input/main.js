document.addEventListener('DOMContentLoaded', function () {
    class Support {
        constructor(wrapperElement) {
            this.wrapperElement = wrapperElement;
        }

        setHeight() {
            const activeBox = document.querySelector('.box1.is-active') ? descartesGrid : polarGrid;
            this.wrapperElement.style.height = `${activeBox.clientHeight}px`;
        }

        getActiveBox() {
            return document.querySelector('.box1.is-active') ? descartesGrid : polarGrid;
        }
    }

    class Diagram {
        constructor(descartesButton, polarButton, descartesGrid, polarGrid, a_value, x_value, y_value) {
            this.descartesButton = descartesButton;
            this.polarButton = polarButton;
            this.descartesGrid = descartesGrid;
            this.polarGrid = polarGrid;
            this.a_value = a_value;
            this.x_value = x_value;
            this.y_value = y_value;
            this.k1 = 1;
            this.k2 = 1;
            this.b1 = null;
            this.b2 = null;
            this.curve = null
            this.yLituusParametric = 0;
            this.xLituusParametric = 0;
            this.yLituusPolar = 0;
            this.xLituusPolar = 0;
        }

        initializeBoards() {
            this.b1 = JXG.JSXGraph.initBoard('box1', { axis: true, boundingbox: [-3, 3, 3, -3], showCopyright: false });
            this.b2 = JXG.JSXGraph.initBoard('box2', { axis: false, boundingbox: [-3, 3, 3, -3], showCopyright: false });
        }

        createParametricCurve() {
            this.b1.create('curve', [
                function (theta) {
                    var r = Math.sqrt(this.k1 / theta);
                    return r * Math.cos(theta) + this.xLituusParametric;
                }.bind(this),
                function (theta) {
                    var r = Math.sqrt(this.k1 / theta);
                    return r * Math.sin(theta) + this.yLituusParametric;
                }.bind(this),
                0,
                8 * Math.PI
            ], { strokeColor: 'red' });
        }

        createPolarGrid() {
            this.b2.create('axis', [
                [0, 0],
                [1, 0]
            ], {
                ticks: {
                    type: 'polar'
                }
            });

            const x1 = -5;
            const x2 = 5;
            const colorGrey = '#666666';

            this.b2.options.layer.line = 1;
            this.b2.options.layer.curve = 2;
            this.b2.create('line', [[x1, Math.tan(Math.PI / 3) * x1], [x2, Math.tan(Math.PI / 3) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });
            this.b2.create('line', [[x1, Math.tan(Math.PI / 6) * x1], [x2, Math.tan(Math.PI / 6) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });
            this.b2.create('line', [[x1, Math.tan(5 * Math.PI / 6) * x1], [x2, Math.tan(5 * Math.PI / 6) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });
            this.b2.create('line', [[x1, Math.tan(2 * Math.PI / 3) * x1], [x2, Math.tan(2 * Math.PI / 3) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });

            this.b2.create('text',[-2.7, Math.tan(Math.PI / 6) * -2.7, '210°'],);
            this.b2.create('text',[2.6, Math.tan(Math.PI / 6) * 2.6 , '30°'],);

            this.b2.create('text',[1.5, Math.tan(Math.PI / 3) * 1.5, '60°'],);
            this.b2.create('text',[-1.5, Math.tan(4 * Math.PI / 3) * -1.5, '240°'],);

            this.b2.create('text',[0.1, 2.95, '90°'],);
            this.b2.create('text',[-0.2, -2.95,"270°"],);

            this.b2.create('text',[-1.5, Math.tan(2 * Math.PI / 3) * -1.5, '120°'],);
            this.b2.create('text',[1.5, Math.tan(5 * Math.PI / 3) * 1.5, '300°'],);

            this.b2.create('text',[-2.6, Math.tan(5 * Math.PI / 6) * -2.6, '150°'],);
            this.b2.create('text',[2.6, Math.tan(11 * Math.PI / 6) * 2.6, '330°'],);

            this.b2.create('text',[2.8, Math.tan(2 * Math.PI/180) * 2.8, '360°'],);
            this.b2.create('text',[-2.9, Math.tan(Math.PI/180) * -2.9, '0°'],);

            // Vertical axis with horizontal ticks
            this.b2.create('axis', [[0,0], [0,1]], {
                ticks: {
                    majorHeight: 0,        // Do not show the grid lines
                    tickEndings: [1, 0],   // Let the ticks point to the left
                    label: {               // Position of the labels
                        visible: true,
                        offset: [-6, 0],
                        anchorY: 'middle',
                        anchorX: 'right'
                    }
                }
            });

            this.b2.create('curve', [
                function (theta) {
                    var r = Math.sqrt(this.k2 / theta);
                    return r * Math.cos(theta) + this.xLituusPolar;
                }.bind(this),
                function (theta) {
                    var r = Math.sqrt(this.k2 / theta);
                    return r * Math.sin(theta) + this.yLituusPolar;
                }.bind(this),
                0,
                8 * Math.PI
            ], { strokeColor: 'red' });
        }

        updateValue() {
            if (controlPanel.getActiveBox() === descartesGrid) {
                this.k1 = this.a_value.value;
                this.b1.update();
            } else {
                this.k2 = this.a_value.value;
                this.b2.update();
            }
        }

        updateX() {
            if (controlPanel.getActiveBox() === descartesGrid) {
                this.xLituusParametric = Number(this.x_value.value);
                this.b1.update();
            } else {
                this.xLituusPolar = Number(this.x_value.value);
                this.b2.update();
            }
        }

        updateY() {
            if (controlPanel.getActiveBox() === descartesGrid) {
                this.yLituusParametric = Number(this.y_value.value);
                this.b1.update();
            } else {
                this.yLituusPolar = Number(this.y_value.value);
                this.b2.update();
            }
        }

        initialize() {
            this.initializeBoards();
            this.createParametricCurve();
            this.createPolarGrid();

            this.a_value.addEventListener('input', () => {
                this.updateValue();
            });

            this.x_value.addEventListener('input', () => {
                this.updateX();
            });

            this.y_value.addEventListener('input', () => {
                this.updateY();
            });

            this.descartesButton.addEventListener('click', () => {
                this.polarGrid.classList.remove('is-active');
                this.descartesGrid.classList.add('is-active');
                if (document.getElementById('r_2')) {
                    document.getElementById('r_2').parentElement.remove();
                }
                this.a_value.value = this.k1;
                this.x_value.value = this.xLituusParametric;
                this.y_value.value = this.yLituusParametric;
            });

            this.polarButton.addEventListener('click', () => {
                this.descartesGrid.classList.remove('is-active');
                this.polarGrid.classList.add('is-active');
                if (document.getElementById('r_1')) {
                    document.getElementById('r_1').parentElement.remove();
                }
                this.a_value.value = this.k2;
                this.x_value.value = this.xLituusPolar;
                this.y_value.value = this.yLituusPolar;
            });

            document.getElementById('box1_navigationbar').style.display = 'none';
            document.getElementById('box2_navigationbar').style.display = 'none';
        }
    }

    class Animation {
        constructor(startButton, stopButton) {
            this.startButton = startButton;
            this.stopButton = stopButton;
        }

        createRect(path, svg, rect, id) {
            let dValue = path.getAttribute('d');
            let segments = dValue.split(' ');
            let lastX, lastY;
            for (let i = segments.length - 3; i >= 0; i -= 3) {
                if (segments[i] === 'L') {
                    lastX = parseFloat(segments[i + 1]);
                    lastY = parseFloat(segments[i + 2]);
                    rect.setAttribute('id', id);
                    rect.setAttribute('width', '6');
                    rect.setAttribute('height', '6');
                    rect.setAttribute('fill', '#003eff');
                    rect.setAttribute('x', lastX);
                    rect.setAttribute('y', lastY);
                    break;
                }
            }

            svg.appendChild(rect);
            path.parentElement.appendChild(svg);
        }

        animateBallOnCurve(path, rect, pathLength) {
            let startTime = performance.now();

            function updateBall(currentTime) {
                let duration = 20000
                let elapsed = currentTime - startTime;
                let progress = Math.min(elapsed / duration, 1);
                let point = path.getPointAtLength((1 - progress) * pathLength);

                rect.setAttribute('x', point.x);
                rect.setAttribute('y', point.y);

                if (progress < 1) {
                    requestAnimationFrame(updateBall);
                }
            }

            requestAnimationFrame(updateBall);
        }

        stopAnimation() {
            if (document.getElementById('r_1')) {
                document.getElementById('r_1').parentElement.remove();
            } else if (document.getElementById('r_2')) {
                document.getElementById('r_2').parentElement.remove();
            }
        }

        startAnimation() {
            let path1 = document.getElementById('box1').querySelector('[stroke="red"]');
            let path2 = document.getElementById('box2').querySelector('[stroke="red"]');
            path1.classList.add('path_1');
            path2.classList.add('path_2');
            const p1 = document.querySelector('.path_1');
            const p2 = document.querySelector('.path_2');

            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');


            // let duration = 20000;

            this.startButton.addEventListener('click', () => {
                if (controlPanel.getActiveBox() === descartesGrid) {
                    let pathLength = p1.getTotalLength();
                    this.createRect(p1, svg, rect, 'r_1');
                    this.animateBallOnCurve(p1, rect, pathLength);
                } else {
                    let pathLength = p2.getTotalLength();
                    this.createRect(p2, svg, rect, 'r_2');
                    this.animateBallOnCurve(p2, rect, pathLength);
                }
            });

            this.stopButton.addEventListener('click', () => {
                this.stopAnimation()
            });
        }
    }

    const controlPanelWrapper = document.querySelector('[am-control-panel="wrapper"]');
    const descartesGrid = document.querySelector('.box1');
    const polarGrid = document.querySelector('.box2');
    const a_value = document.getElementById('a-value');
    const x_value = document.getElementById('x-value');
    const y_value = document.getElementById('y-value');
    const descartesButton = document.getElementById('dekart');
    const polarButton = document.getElementById('polar');

    const controlPanel = new Support(controlPanelWrapper);
    const diagram = new Diagram(descartesButton, polarButton, descartesGrid, polarGrid, a_value, x_value, y_value);
    const animation = new Animation(document.getElementById('anim-start'), document.getElementById('anim-stop'));

    window.addEventListener('resize', () => {
        controlPanel.setHeight()
    });


    diagram.initialize();
    controlPanel.setHeight();
    animation.startAnimation();
});
