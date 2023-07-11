document.addEventListener('DOMContentLoaded', function () {
    const controlPanelWrapper = document.querySelector('[am-control-panel="wrapper"]');
    const descartesGrid = document.querySelector('.box1');
    const polarGrid = document.querySelector('.box2');
    const a_value = document.getElementById('a-value');
    const descartesButton = document.getElementById('dekart');
    const polarButton = document.getElementById('polar');

    let k1 = 1;
    let k2 = 1;

    function setControlPanelHeight() {
        const activeBox = document.querySelector('.box1.is-active') ? descartesGrid : polarGrid;
        controlPanelWrapper.style.height = `${activeBox.clientHeight}px`;
        console.log(document.querySelector('[am-container="graph"]').querySelector('.is-active').clientHeight);
    }

    window.addEventListener('resize', setControlPanelHeight);

    descartesButton.addEventListener('click', () => {
        polarGrid.classList.remove('is-active');
        descartesGrid.classList.add('is-active');
        if (document.getElementById('r_2')) {
            document.getElementById('r_2').parentElement.remove();
        }
        a_value.value = k1;
        console.log('dekart');
    });

    polarButton.addEventListener('click', () => {
        descartesGrid.classList.remove('is-active');
        polarGrid.classList.add('is-active');
        if (document.getElementById('r_1')) {
            document.getElementById('r_1').parentElement.remove();
        }
        a_value.value = k2;
        console.log('polar');
    });

    function createRect(path, svg, rect, id) {
        let dValue = path.getAttribute('d');
        let segments = dValue.split(' ');
        let lastX, lastY;
        for (let i = segments.length - 3; i >= 0; i -= 3) {
            if (segments[i] === 'L') {
                lastX = parseFloat(segments[i + 1]);
                lastY = parseFloat(segments[i + 2]);
                console.log(lastX, lastY);
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
        console.log(path.parentElement.lastChild);
        console.log('Create');
    }

    function createDiagram() {
        return new Promise((resolve, reject) => {
            let b1, b2;

            const initializeBoards = () => {
                b1 = JXG.JSXGraph.initBoard('box1', { axis: true, boundingbox: [-3, 3, 3, -3], showCopyright: false });
                b2 = JXG.JSXGraph.initBoard('box2', { axis: false, boundingbox: [-3, 3, 3, -3], showCopyright: false });
            };

            const createParametricCurve = () => {
                let yLituus = 0;
                let xLituus = 0;

                return b1.create('curve', [
                    function (theta) {
                        var r = Math.sqrt(k1 / theta);
                        return r * Math.cos(theta) + xLituus;
                    },
                    function (theta) {
                        var r = Math.sqrt(k1 / theta);
                        return r * Math.sin(theta) + yLituus;
                    },
                    0,
                    8 * Math.PI
                ], {strokeColor: 'red'});
            };

            const createPolarGrid = () => {
                let yLituus = 0;
                let xLituus = 0;

                b2.create('axis', [
                    [0, 0],
                    [1, 0]
                ], {
                    ticks: {
                        type: 'polar'
                    }
                });

                const x1 = -5;
                const x2 = 5;
                const colorGrey = '#666666'

                b2.options.layer.line = 1;
                b2.options.layer.curve = 2;
                b2.create('line', [[x1, Math.tan(Math.PI / 3) * x1], [x2, Math.tan(Math.PI / 3) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });
                b2.create('line', [[x1, Math.tan(Math.PI / 6) * x1], [x2, Math.tan(Math.PI / 6) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });
                b2.create('line', [[x1, Math.tan(5 * Math.PI / 6) * x1], [x2, Math.tan(5 * Math.PI / 6) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });
                b2.create('line', [[x1, Math.tan(2 * Math.PI / 3) * x1], [x2, Math.tan(2 * Math.PI / 3) * x2]], { strokewidth: 1, strokeColor: colorGrey, strokeOpacity: 0.25 });

                b2.create('text',[-2.7, Math.tan(Math.PI / 6) * -2.7, '210°'],);
                b2.create('text',[2.6, Math.tan(Math.PI / 6) * 2.6 , '30°'],);

                b2.create('text',[1.5, Math.tan(Math.PI / 3) * 1.5, '60°'],);
                b2.create('text',[-1.5, Math.tan(4 * Math.PI / 3) * -1.5, '240°'],);

                b2.create('text',[0.1, 2.95, '90°'],);
                b2.create('text',[-0.2, -2.95,"270°"],);

                b2.create('text',[-1.5, Math.tan(2 * Math.PI / 3) * -1.5, '120°'],);
                b2.create('text',[1.5, Math.tan(5 * Math.PI / 3) * 1.5, '300°'],);

                b2.create('text',[-2.6, Math.tan(5 * Math.PI / 6) * -2.6, '150°'],);
                b2.create('text',[2.6, Math.tan(11 * Math.PI / 6) * 2.6, '330°'],);

// Vertical axis with horizontal ticks
                b2.create('axis', [[0,0], [0,1]], {
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

                b2.create('curve', [function(phi){return Math.sqrt(k2/phi); }, [xLituus, yLituus],0, 8*Math.PI],
                    {curveType:'polar', strokewidth:1, strokeColor: 'red'});
                resolve('result')
            };

            initializeBoards();
            const curve = createParametricCurve();
            createPolarGrid();

            a_value.addEventListener('input', () => {
                if (descartesGrid.classList.contains('is-active')) {
                    k1 = a_value.value;
                    b1.update();
                } else {
                    k2 = a_value.value;
                    b2.update();
                }
            });

            document.getElementById('box1_navigationbar').style.display = 'none';
            document.getElementById('box2_navigationbar').style.display = 'none';

            resolve(curve);
        });
    }

    function animateBallOnCurve(path, rect, pathLength) {
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

    function startAnimation() {
        let path1 = document.getElementById('box1').querySelector('[stroke="red"]');
        let path2 = document.getElementById('box2').querySelector('[stroke="red"]');
        path1.classList.add('path_1');
        path2.classList.add('path_2');
        const p1 = document.querySelector('.path_1');
        const p2 = document.querySelector('.path_2');

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        let pathLength = p1.getTotalLength();
        let duration = 20000;

        document.getElementById('anim-start').addEventListener('click', () => {
            if (descartesGrid.classList.contains('is-active')) {
                createRect(p1, svg, rect, 'r_1');
                animateBallOnCurve(p1, rect, pathLength);
            } else {
                createRect(p2, svg, rect, 'r_2');
                animateBallOnCurve(p2, rect, pathLength);
            }
        });
    }

    function initializePage() {
        createDiagram().then(() => {
            setControlPanelHeight();
            startAnimation()
        });
    }

    window.addEventListener('load', initializePage);
});
