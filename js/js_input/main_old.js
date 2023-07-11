document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('[am-control-panel="wrapper"]').style.height = `${document.querySelector('.box1').clientHeight}px`
    window.addEventListener('resize', () => {
        if (document.querySelector('.box1.is-active')) {
            document.querySelector('[am-control-panel="wrapper"]').style.height = `${document.querySelector('.box1').clientHeight}px`
        } else {
            document.querySelector('[am-control-panel="wrapper"]').style.height = `${document.querySelector('.box2').clientHeight}px`
        }
        console.log(document.querySelector('[am-container="graph"]').querySelector('.is-active').clientHeight)
    })


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
        a_value.value = k1
        console.log('dekart')
    })

    polar_button.addEventListener('click', () => {
        dekart.classList.remove('is-active')
        polar.classList.add('is-active')
        if (document.getElementById('r_1')) {
            document.getElementById('r_1').parentElement.remove()
        }
        a_value.value = k2
        console.log('polar')
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
            let b1 = JXG.JSXGraph.initBoard('box1', {axis:true, boundingbox: [-3, 3, 3, -3], showCopyright:false});

            let y = 0
            let x = 0

// Создание кривой в параметрической форме
            var curve = b1.create('curve', [function (theta) {
                var r = Math.sqrt(k1 / theta);
                return r * Math.cos(theta) + x;
            }, function (theta) {
                var r = Math.sqrt(k1 / theta);
                return r * Math.sin(theta) + y;
            }, 0, 8 * Math.PI], { strokeColor: 'red' });

            // resolve('result')



            let b2 = JXG.JSXGraph.initBoard('box2', {axis:false, boundingbox:[-3, 3, 3, -3]});
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
            // var startPoint = b2.create('point', [-2.7, Math.tan(Math.PI / 6) * -2.7], {name: '', size: 1, color: 'transparent'});
            //
            // // Показать точку конца линии
            // var endPoint = b2.create('point', [2.7, Math.tan(Math.PI / 6) * 2.7], {name: '', size: 1, color: 'transparent'});

            // Добавить текстовую надпись к первой точке
            var deg210 = b2.create('text',[-2.7, Math.tan(Math.PI / 6) * -2.7, '210°'],);
            var deg30 = b2.create('text',[2.6, Math.tan(Math.PI / 6) * 2.6 , '30°'],);

            var deg60 = b2.create('text',[1.5, Math.tan(Math.PI / 3) * 1.5, '60°'],);
            var deg240 = b2.create('text',[-1.5, Math.tan(4 * Math.PI / 3) * -1.5, '240°'],);

            var deg90 = b2.create('text',[0.1, 2.95, '90°'],);
            var deg270 = b2.create('text',[-0.2, -2.95,"270°"],);

            var deg120 = b2.create('text',[-1.5, Math.tan(2 * Math.PI / 3) * -1.5, '120°'],);
            var deg300 = b2.create('text',[1.5, Math.tan(5 * Math.PI / 3) * 1.5, '300°'],);

            var deg150 = b2.create('text',[-2.6, Math.tan(5 * Math.PI / 6) * -2.6, '150°'],);
            var deg330 = b2.create('text',[2.6, Math.tan(11 * Math.PI / 6) * 2.6, '330°'],);

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
                if (document.querySelector('.box1.is-active')) {
                    k1 = a_value.value
                    b1.update()
                } else {
                    k2 = a_value.value
                    b2.update()
                }
            })

            document.getElementById("box1_navigationbar").style.display = 'none'
            document.getElementById("box2_navigationbar").style.display = 'none'

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
