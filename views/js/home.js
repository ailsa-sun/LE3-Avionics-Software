const socket = io();

var states = [
    "IDLE",
    "ARMED",
    "PRESS",
    "QD",
    "IGNITION",
    "HOTFIRE",
    "ABORT"
]

const PT_O1_chart_data = [];
var PT_O1_chart = null;

const PT_O2_chart_data = [];
var PT_O2_chart = null;

const PT_E1_chart_data = [];
var PT_E1_chart = null;

const PT_E2_chart_data = [];
var PT_E2_chart = null;

const PT_C1_chart_data = [];
var PT_C1_chart = null;

const TC_1_chart_data = [];
var TC_1_chart = null;

const TC_2_chart_data = [];
var TC_2_chart = null;

const TC_3_chart_data = [];
var TC_3_chart = null;

const TC_4_chart_data = [];
var TC_4_chart = null;

const PT_X_chart_data = [];
var PT_X_chart = null;

var center_graph = null;

document.addEventListener('DOMContentLoaded', () => {
    socket.emit('page ready', Date.now());

    const center_graph_element = document.getElementById('center_graph');

    const PT_O1_element = document.getElementById('PT_O1');
    const PT_O2_element = document.getElementById('PT_O2');
    const PT_E1_element = document.getElementById('PT_E1');
    const PT_E2_element = document.getElementById('PT_E2');
    const PT_C1_element = document.getElementById('PT_C1');

    const TC_1_element = document.getElementById('TC_1');
    const TC_2_element = document.getElementById('TC_2');
    const TC_3_element = document.getElementById('TC_3');
    const TC_4_element = document.getElementById('TC_4');


    const PT_X_element = document.getElementById('PT_X');

    // make chart div clickable for zooming
    PT_O1_element.style.cursor = 'pointer';
    PT_O1_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PT_O1',
                    data: PT_O1_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    PT_O2_element.style.cursor = 'pointer';
    PT_O2_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PT_O2',
                    data: PT_O2_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    PT_E1_element.style.cursor = 'pointer';
    PT_E1_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PT_E1',
                    data: PT_E1_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    PT_E2_element.style.cursor = 'pointer';
    PT_E2_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PT_E2',
                    data: PT_E2_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    PT_C1_element.style.cursor = 'pointer';
    PT_C1_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PT_C1',
                    data: PT_C1_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    TC_1_element.style.cursor = 'pointer';
    TC_1_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'TC_1',
                    data: TC_1_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    TC_2_element.style.cursor = 'pointer';
    TC_2_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'TC_2',
                    data: TC_2_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    TC_3_element.style.cursor = 'pointer';
    TC_3_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'TC_3',
                    data: TC_3_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    TC_4_element.style.cursor = 'pointer';
    TC_4_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'TC_4',
                    data: TC_4_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })

    PT_X_element.style.cursor = 'pointer';
    PT_X_element.addEventListener('click', () => {

        if (center_graph) center_graph.destroy();

        center_graph = new Chart(center_graph_element, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PT_X',
                    data: PT_X_chart_data
                }]
            },
            options: {
                parsing: {
                    xAxisKey: 'data\\.key',
                    yAxisKey: 'data\\.value',
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            boxWidth: 0
                        }
                    }
                }
            }
        });
    })


    PT_O1_chart = new Chart(PT_O1_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PT_O1',
                data: PT_O1_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    PT_O2_chart = new Chart(PT_O2_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PT_O2',
                data: PT_O2_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        },
    });

    PT_E1_chart = new Chart(PT_E1_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PT_E1',
                data: PT_E1_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });


    PT_E2_chart = new Chart(PT_E2_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PT_E2',
                data: PT_E2_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    PT_C1_chart = new Chart(PT_C1_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PT_C1',
                data: PT_C1_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    TC_1_chart = new Chart(TC_1_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'TC_1',
                data: TC_1_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    TC_2_chart = new Chart(TC_2_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'TC_2',
                data: TC_2_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    TC_3_chart = new Chart(TC_3_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'TC_3',
                data: TC_3_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    TC_4_chart = new Chart(TC_4_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'TC_4',
                data: TC_4_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });


    PT_X_chart = new Chart(PT_X_element, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PT_X',
                data: PT_X_chart_data
            }]
        },
        options: {
            parsing: {
                xAxisKey: 'data\\.key',
                yAxisKey: 'data\\.value',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
    });

    // if any button is clicked, send the command to the server via socketio
    document.getElementById('idleBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'idle');
    });

    document.getElementById('armedBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'armed');
    });

    document.getElementById('pressedBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'pressed');
    });

    document.getElementById('qdBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'qd');
    });

    document.getElementById('ignitionBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'ignition');
    });

    document.getElementById('mainsBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'mains');
    });

    document.getElementById('abortBtn').addEventListener('click', () => {
        socket.emit('btnPress', 'abort');
    });

    document.getElementById('resetView').addEventListener('click', () => {
        console.log('resetting view');
        if (center_graph) center_graph.destroy();
        center_graph = null;
    });

})

socket.on('graph data', (graphData) => {
    // console.log('graph data:', graphData)

    // setup timezones
    document.getElementById('PST_time').innerText = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour12: false });
    document.getElementById('Local_time').innerText = new Date().toLocaleTimeString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, hour12: false }); // works on 95% of browsers, gets system's IANA timezone - MAKE SURE YOUR COMPUTER TIMEZONE IS SET CORRECTLY!
    document.getElementById('UTC_time').innerText = new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false });

    // jsonify the data
    const data = JSON.parse(graphData);

    // push to individual chart
    PT_O1_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.PT_O1_set ? data.PT_O1 + data.PT_O1_offset : data.PT_O1 });


    PT_O2_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.PT_O2_set ? data.PT_O2 + data.PT_O2_offset : data.PT_O2 });


    PT_E1_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.PT_E1_set ? data.PT_E1 + data.PT_E1_offset : data.PT_E1 });


    PT_E2_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.PT_E2_set ? data.PT_E2 + data.PT_E2_offset : data.PT_E2 });


    PT_C1_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.PT_C1_set ? data.PT_C1 + data.PT_C1_offset : data.PT_C1 });


    TC_1_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.TC_1 });

    TC_2_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.TC_2 });

    TC_3_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.TC_3 });

    TC_4_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.TC_4 });

    PT_X_chart_data.push({ 'data.key': (data.messageTime / 100).toFixed(2), 'data.value': data.PT_X_set ? data.PT_X + data.PT_X_offset : data.PT_X });

    // if array size > 500, shift off the first element
    if (PT_O1_chart_data.length > 500) PT_O1_chart_data.shift();
    if (PT_O2_chart_data.length > 500) PT_O2_chart_data.shift();
    if (PT_E1_chart_data.length > 500) PT_E1_chart_data.shift();
    if (PT_E2_chart_data.length > 500) PT_E2_chart_data.shift();
    if (PT_C1_chart_data.length > 500) PT_C1_chart_data.shift();
    if (TC_1_chart_data.length > 500) TC_1_chart_data.shift();
    if (TC_2_chart_data.length > 500) TC_2_chart_data.shift();
    if (TC_3_chart_data.length > 500) TC_3_chart_data.shift();
    if (TC_4_chart_data.length > 500) TC_4_chart_data.shift();
    if (PT_X_chart_data.length > 500) PT_X_chart_data.shift();

    PT_O1_chart.update('active');
    PT_O2_chart.update('active');
    PT_E1_chart.update('active');
    PT_E2_chart.update('active');
    PT_C1_chart.update('active');

    TC_1_chart.update('active');
    TC_2_chart.update('active');
    TC_3_chart.update('active');
    TC_4_chart.update('active');

    PT_X_chart.update('active');

    if (center_graph) center_graph.update('active');

    // update states according to the following:

    document.getElementById('COMState').innerText = states[data.COMState];
    document.getElementById('DAQState').innerText = states[data.DAQState];
    document.getElementById('FlightState').innerText = states[data.FlightState];
    document.getElementById('DAQState').innerText = states[data.DAQState];
    document.getElementById('DAQState').innerText = states[data.DAQState];
    document.getElementById('AUTOABORT').innerText = data.AUTOABORT ? 'TRUE' : 'FALSE';
    document.getElementById('FlightQueueLength').innerText = data.FlightQueueLength;
    document.getElementById('ethComplete').innerText = data.ethComplete ? 'TRUE' : 'FALSE';
    document.getElementById('oxComplete').innerText = data.oxComplete ? 'TRUE' : 'FALSE';
    document.getElementById('oxVentComplete').innerText = data.oxVentComplete ? 'TRUE' : 'FALSE';
    document.getElementById('ethVentComplete').innerText = data.ethVentComplete ? 'TRUE' : 'FALSE';
    document.getElementById('sdCardInitialized').innerText = data.sdCardInitialized ? 'TRUE' : 'FALSE';
});



