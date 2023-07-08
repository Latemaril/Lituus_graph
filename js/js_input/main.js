document.addEventListener('DOMContentLoaded', function () {
    const ball = '<circle id="ball" cx="272" cy="250" r="2" fill="#FF0000"></circle>'
    const dekart = document.querySelector('.box1')
    const polar = document.querySelector('.box2')

    const dekart_button = document.getElementById('dekart')
    const polar_button = document.getElementById('polar')

    const zoom_m = document.getElementById('zoom-minus')
    const zoom_p = document.getElementById('zoom-plus')
    const nav_reset = document.getElementById('nav_reset')

    const y_m = document.getElementById('y-minus')
    const y_p = document.getElementById('y-plus')
    const x_m = document.getElementById('x-minus')
    const x_p = document.getElementById('x-plus')
    const a_value = document.getElementById('a-value')

    let k1 = 1
    let k2 = 1


    dekart_button.addEventListener('click', () => {
        polar.classList.remove('is-active')
        dekart.classList.add('is-active')
        if (document.getElementById('r_2')) {
            document.getElementById('r_2').parentElement.remove()
        }
        console.log('csdcsd')
    })

    polar_button.addEventListener('click', () => {
        dekart.classList.remove('is-active')
        polar.classList.add('is-active')
        if (document.getElementById('r_1')) {
            document.getElementById('r_1').parentElement.remove()
        }
        console.log('csdcsdcac')
    })

    function Create_rect(path, svg, rect, id) {
        let dValue = path.getAttribute('d');
        let segments = dValue.split(' ');
        let lastX, lastY;
        for (let i = segments.length - 3; i >= 0; i -= 3) {
            if (segments[i] === 'L') {
                lastX = parseFloat(segments[i + 1]);
                lastY = parseFloat(segments[i + 2]);
                console.log(lastX,lastY)
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
        console.log(path.parentElement.lastChild)
        console.log("Create")
    }

    function Diagram () {

        let promise = new Promise((resolve, reject) => {

            // Готовим диаграмму
            let b1 = JXG.JSXGraph.initBoard('box1', {axis:true, boundingbox: [-1, 1, 1, -1], showCopyright:false, grid:false});
            let c1 = b1.create('curve', [function(phi){return Math.sqrt(k1/phi); }, [0, 0],0, 8*Math.PI],
                {curveType:'polar', strokewidth:1, strokeColor: 'red'});
            // resolve('result')



            let b2 = JXG.JSXGraph.initBoard('box2', {axis:false, boundingbox:[-1, 1, 1, -1]});
// Horizontal axis with polar grid lines
            let ax1 = b2.create('axis', [[0,0], [1,0]], {
                ticks: {
                    type: 'polar',         // Polar grid
                    label: {               // Position of the labels

                    }
                }
            });

            let x1 = -5;
            let x2 = 5;

            // Создание линии
            b2.options.layer.line = 1;
            b2.options.layer.curve = 2;
            let line1 = b2.create('line', [[-5, Math.tan(Math.PI / 3) * x1], [5, Math.tan(Math.PI / 3) * x2]], {strokewidth:1, strokeColor: '#666666', strokeOpacity:0.25});
            let line2 = b2.create('line', [[-5, Math.tan(Math.PI / 6) * x1], [5, Math.tan(Math.PI / 6) * x2]], {strokewidth:1, strokeColor: '#666666', strokeOpacity:0.25});
            let line3 = b2.create('line', [[-5, Math.tan(5 * Math.PI / 6) * x1], [5, Math.tan(5 * Math.PI / 6) * x2]], {strokewidth:1, strokeColor: '#666666', strokeOpacity:0.25});
            let line4 = b2.create('line', [[-5, Math.tan(2 * Math.PI / 3) * x1], [5, Math.tan(2 * Math.PI / 3) * x2]], {strokewidth:1, strokeColor: '#666666', strokeOpacity:0.25});



            // Показать точку начала линии
            var startPoint = b2.create('point', [-0.85, Math.tan(Math.PI / 6) * -0.85], {name: '', size: 1, color: 'transparent'});

            // Показать точку конца линии
            var endPoint = b2.create('point', [0.85, Math.tan(Math.PI / 6) * 0.85], {name: '', size: 1, color: 'transparent'});

            // Добавить текстовую надпись к первой точке
            var label1 = b2.create('text', [-0.85, Math.tan(Math.PI / 6) * -0.85, '30°'], {offset: [-30, -20]});

            // Добавить текстовую надпись ко второй точке
            var label2 = b2.create('text', [0.85, Math.tan(Math.PI / 6) * 0.85, '210°'], {offset: [10, 10]});

// Vertical axis with horizontal ticks
            let ax2 = b2.create('axis', [[0,0], [0,1]], {
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

            let c2 = b2.create('curve', [function(phi){return Math.sqrt(k2/phi); }, [0, 0],0, 8*Math.PI],
                {curveType:'polar', strokewidth:1, strokeColor: 'red'});
            resolve('result')

            a_value.addEventListener('input', () => {

            })

        });

// promise.then навешивает обработчики на успешный результат или ошибку
        promise
            .then(
                result => {
                    const path1 = document.getElementById('box1').querySelector('[stroke="red"]')
                    const path2 = document.getElementById('box2').querySelector('[stroke="red"]')
                    path1.classList.add('path_1')
                    path2.classList.add('path_2')
                    const p1 = document.querySelector('.path_1')
                    const p2 = document.querySelector('.path_2')


                    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    // Create_rect(path1, svg, rect, 'r_1')
                    // Create_rect(path2, svg, rect, 'r_2')

                    // Настроить анимацию передвижения шарика по кривой линии
                    let pathLength = p1.getTotalLength();
                    let duration = 20000; // Продолжительность анимации в миллисекундах

                    function moveBall(path, rect) {
                        let startTime = performance.now();

                        function updateBall(currentTime) {
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
                    document.getElementById('anim-start').addEventListener('click', () => {
                        if (dekart.classList.contains('is-active')) {
                            // console.log(p2)
                            Create_rect(p1, svg, rect, 'r_1')
                            moveBall(p1, rect, pathLength);
                        } else {
                            // console.log(p2)
                            Create_rect(p2, svg, rect, 'r_2')
                            moveBall(p2, rect, pathLength);
                        }
                    })
                },
                error => {
                    // вторая функция - запустится при вызове reject
                    alert("Rejected: " + error); // error - аргумент reject
                }
            );
    }


//Ставим загрузку диаграммы на событие загрузки страницы
    window.addEventListener("load", () => {
        Diagram()
        zoom_m.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_out').click()
            } else {
                document.getElementById('box2_navigation_out').click()
            }
        })
        zoom_p.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_in').click()
            } else {
                document.getElementById('box2_navigation_in').click()
            }
        })

        y_m.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_down').click()
            } else {
                document.getElementById('box2_navigation_down').click()
            }
        })
        y_p.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_up').click()
            } else {
                document.getElementById('box2_navigation_up').click()
            }
        })

        x_m.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_left').click()
            } else {
                document.getElementById('box2_navigation_left').click()
            }
        })
        x_p.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_right').click()
            } else {
                document.getElementById('box2_navigation_right').click()
            }
        })
        nav_reset.addEventListener('click', () => {
            if (document.querySelector('.box1.is-active')) {
                document.getElementById('box1_navigation_100').click()
            } else {
                document.getElementById('box2_navigation_100').click()
            }
        })

    });

})
