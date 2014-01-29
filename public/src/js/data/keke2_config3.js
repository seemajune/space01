var stage = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight
};

var world = {
	x: 0,
	y: 0,
	width: 4096,
	height: stage.height,
	gravity: {
		x: 0,
		y: 15
	}
};

var config = {
	// IMAGES
	images: {
		// scenery
		sky: 'images/night_sky.jpg',

		mountainBackground1a: 'images/mountain_background1a.png',
		mountainBackground1b: 'images/mountain_background1b.png',

		movingBackground0a: 'images/new_backgroundA1a.png',
		movingBackground0b: 'images/new_backgroundA1b.png',
		movingBackground0: 'images/new_backgroundA1a.png',
		movingBackground1: 'images/new_backgroundA1b.png',
		movingBackground2: 'images/new_backgroundA1a.png',
		movingBackground3: 'images/new_backgroundA1b.png',
		movingBackground4: 'images/new_backgroundA1b.png',

		// movingBackground0a: 'images/moving_background0a.png',
		// movingBackground0b: 'images/moving_background0b.png',
		// movingBackground0: 'images/moving_background0.png',
		// movingBackground1: 'images/moving_background1.png',
		// movingBackground2: 'images/moving_background2.png',
		// movingBackground3: 'images/moving_background5.png',
		// movingBackground4: 'images/moving_background5.png',

		tree01: 'images/tree01.png',
		tree01Traced: 'images/tree01_traced.png',
		tree02: 'images/tree02.png',
		tree03: 'images/tree03.png',
		tree04: 'images/tree04.png',
		grass1: 'images/grass01.png',
		grass2: 'images/grass02.png',
		platform: 'images/platform.png',
		platformV: 'images/platform_v.png',
		rockPlatform1: 'images/rock_platform1.png',
		branch02Left: 'images/vine01_left.png',
		// branch02Left: 'images/branch02_left.png',
		vine01Left: 'images/vine01_left.png',
		branch02Right: 'images/vine01_right.png',
		// branch02Right: 'images/branch02_right.png',
		vine01Right: 'images/vine01_right.png',
		thorns: 'images/thorns02.png',

		// bonuses
		lollipop: 'images/lollipop.png',
		cupcake: 'images/cupcake.png',
		particle: 'images/particle01.png',

		// buttons
		leftButton: 'images/arrow_left.png',
		rightButton: 'images/arrow_right.png',
		upButton: 'images/arrow_up.png',
		startButton: 'images/start_button.png',
		nextButton: 'images/next_button.png',
		pauseButton: 'images/pause_button.png',
		menuButton: 'images/menu_button.png',
		quitButton: 'images/quit_button.png',
		greyRect: 'images/grey_rect32x32.png',

		// icons
		heart: 'images/heart.png',
		damageIcon: 'images/alarm_icon.png',
		invisibleBg: 'images/invisible.png'
	},
	// SPRITES
	sprites: {
		// player
		keke: {
			url: 'images/keke_character3.png', 
			width: 95, 
			height: 113, 
			frames: 35
		},
/*				
		keke: {
			url: 'images/keke_character2.png', 
			width: 76, 
			height: 128, 
			frames: 35
		},
*/
		// enemies
		caterpillar02a: {
			url: 'images/caterpillar02a.png',
			width: 104, 
			height: 32, 
			frames: 14
		},
		caterpillar02b: {
			url: 'images/caterpillar02b.png',
			width: 104, 
			height: 32, 
			frames: 14
		}
	},
	// CONTROLS
	controls: {
		keys: {
			name: 'controlKeys',
			cl: 'ControlKey',
			attrs: [{
				name: 'gameOver',
				cl: 'ControlKey',
				attrs: {
					inputCode: Polyworks.InputCodes.QUIT,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'quit'
						}
					}
				}
			},
			{
				name: 'left',
				cl: 'ControlKey',
				attrs: {
					inputCode: Polyworks.InputCodes.LEFT
				}
			},
			{
				name: 'right',
				cl: 'ControlKey',
				attrs: {
					inputCode: Polyworks.InputCodes.RIGHT
				}
			},
			{
				name: 'up',
				cl: 'ControlKey',
				attrs: {
					inputCode: Polyworks.InputCodes.UP
				}
			}]
		},
		buttons: {
			menu: [{
				name: 'start',
				cl: 'InputButton',
				attrs: {
					img: 'startButton',
					start: {
						x: stage.width/2 - 128,
						y: stage.height/2 - 64
					},
					inputCode: Polyworks.InputCodes.PLAY,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'level'
						}
					}
				}
			},
			{
				name: 'quitBtn',
				cl: 'InputButton',
				attrs: {
					img: 'quitButton',
					start: {
						x: 30,
						y: 15
					},
					inputCode: Polyworks.InputCodes.QUIT,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'quit'
						}
					}
				}
			}
			],
			intermission: [{
				name: 'next',
				cl: 'InputButton',
				attrs: {
					img: 'nextButton',
					start: {
						x: stage.width/2 - 128,
						y: stage.height/2 - 64
					},
					inputCode: Polyworks.InputCodes.NEXT,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'nextLevel'
						}
					}
				}
			},
			{
				name: 'menuBtn',
				cl: 'InputButton',
				attrs: {
					img: 'menuButton',
					start: {
						x: 30,
						y: 15
					},
					inputCode: Polyworks.InputCodes.MENU,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'menu'
						}
					}
				}
			}
			],
			completed: [
			{
				name: 'menuBtn',
				cl: 'InputButton',
				attrs: {
					img: 'menuButton',
					start: {
						x: 30,
						y: 15
					},
					inputCode: Polyworks.InputCodes.MENU,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'menu'
						}
					}
				}
			}
			],
			gameOver: [
			{
				name: 'menuBtn',
				cl: 'InputButton',
				attrs: {
					img: 'menuButton',
					start: {
						x: 30,
						y: 15
					},
					inputCode: Polyworks.InputCodes.MENU,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'menu'
						}
					}
				}
			}
			],
			level: [{
				name: 'invisBtn',
				cl: 'InputButton',
				attrs: {
					img: 'invisibleBg',
					start: {
						x: 0,
						y: 0
					},
					width: stage.width, 
					height: stage.height,
					inputCode: Polyworks.InputCodes.RESET
				}
			},
			{
				name: 'leftBtn',
				cl: 'InputButton',
				attrs: {
					img: 'leftButton',
					start: {
						x: 30,
						y: stage.height - 266
					},
					inputCode: Polyworks.InputCodes.LEFT
				}
			},
			{
				name: 'rightBtn',
				cl: 'InputButton',
				attrs: {
					img: 'rightButton',
					start: {
						x: 150,
						y: stage.height - 266
					},
					inputCode: Polyworks.InputCodes.RIGHT
				}
			},
			{
				name: 'upBtn',
				cl: 'InputButton',
				attrs: {
					img: 'upButton',
					start: {
						x: stage.width - 90,
						y: stage.height - 266
					},
					inputCode: Polyworks.InputCodes.UP
				}
			},
			{
				name: 'pauseButton',
				cl: 'InputButton',
				attrs: {
					img: 'pauseButton',
					start: {
						x: 30,
						y: 15
					},
					inputCode: Polyworks.InputCodes.PAUSE,
					events: {
						pressed: {
							type: Polyworks.Events.CHANGE_STATE,
							value: 'menu'
						}
					}
				}
			}
			]
		}
	},
	// STATES
	initialState: 'menu',
	states: [
	// menu
	{
		name: 'menu',
		cl: 'MenuState',
		world: {
			x: 0,
			y: 0,
			width: stage.width,
			height: stage.height
		},
		clearWorld: true,
		clearCache: false,
		attrs: [
		{
			name: 'menu-group',
			cl: 'GroupCollection',
			attrs: [
			{
				name: 'bg',
				cl: 'Sprite',
				attrs: {
					img: 'greyRect',
					start: {
						x: 20,
						y: 20 
					},
					phaser: {
						width: stage.width - 40,
						height: stage.height - 40
					}
				}
			},
			{
				name: 'title',
				cl: 'Text',
				attrs: {
					centerX: true,
					centerY: false,
					x: 0,
					y: 40,
					defaultContent: 'Keke vs. the Caterpillars',
					style: { 
						font: '30px Arial', 
						fill: '#000000',
						align: 'center'
					}
				}
			}
			]
		},
		{
			name: 'menu-controls',
			cl: 'ControlButtons',
			type: 'menu',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}
		]
	},
	// level 1
	{
		name: 'level1',
		cl: 'LevelState',
		world: {
			x: 0,
			y: -256,
			width: 4096,
			height: stage.height + 256
		},
		clearWorld: true,
		clearCache: false,
		bounds: {
			start: 0,
			// end: 1024
			end: 4020
		},
		attrs: [{
			name: 'scenery',
			cl: 'GroupCollection',
			attrs: [{
				name: 'sky',
				cl: 'Sprite',
				attrs: {
					img: 'sky',
					name: 'sky',
					start: {
						x: 0,
						y: 0
					},
					phaser: {
						width: stage.width,
						height: stage.height,
						fixedToCamera: true
					}
				}
			},
			{
				name: 'moving_background01',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground0a',
					start: {
						x: 0,
						y: -(stage.height * 0.5)
						// y: stage.height - 512
					},
					phaser: {
						width: 2048,
						height: stage.height * 1.5,
						// height: 512,
					}
				}
			},
			{
				name: 'moving_background02',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground0b',
					start: {
						x: 2048,
						y: -(stage.height * 0.5)
					},
					phaser: {
						width: 2048,
						height: stage.height * 1.5,
					}
				}
			// },
			// {
			// 	name: 'tree05',
			// 	cl: 'Sprite',
			// 	attrs: {
			// 		img: 'tree02',
			// 		start: {
			// 			x: 3700,
			// 			y: (-stage.height)
			// 		},
			// 		phaser: {
			// 			width: stage.height,
			// 			height: stage.height * 2,
			// 		}
			// 	}
			// },
			// {
			// 	name: 'grass0',
			// 	cl: 'Sprite',
			// 	attrs: {
			// 		img: 'grass1',
			// 		start: {
			// 			x: 0,
			// 			y: stage.height - 220
			// 		}
			// 	}
			// },
			// {
			// 	name: 'grass1',
			// 	cl: 'Sprite',
			// 	attrs: {
			// 		img: 'grass2',
			// 		start: {
			// 			x: 2048,
			// 			y: stage.height - 220
			// 		}
			// 	}
			}
			]
		},
		{
			name: 'terrain',
			cl: 'PhysicalGroupCollection',
			attrs: [
			{
				name: 'leftWall',
				cl: 'Sprite',
				attrs: {
					img: 'platformV',
					start: {
						x: -16,
						y: -stage.height
					},
					phaser: {
						width: 16,
						height: stage.height * 2
					},
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'platform',
					start: {
						x: 0,
						y: world.height - 20
					},
					scale: [32, 2],
					physics: {
						immovable: true
					}
				}
			}
			]
		},
		{
			name: 'sectors',
			cl: 'SectorManager',
			attrs: [{
				name: 'sector0',
				cl: 'Sector',
				bounds: {
					start: 0,
					end: 1024
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [						
						{
							name: 'level1-sector0-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								name: 'caterpillar02a-sprite',
								img: 'caterpillar02a',
								start: {
									x: 700,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								phaser: {
									health: 5
								},
								attack: 5,
								score: 500,
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}] 
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			},
			{
				name: 'sector1',
				cl: 'Sector',
				bounds: {
					start: 1024,
					end: 2048
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level1-sector1-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 1500,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								phaser: {
									health: 5
								},
								speed: 0.5,
								attack: 5,
								score: 1000,
								movement: {
									speed: 0.25,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
					]
			},
			{
				name: 'sector2',
				cl: 'Sector',
				bounds: {
					start: 2048,
					end: 3072
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level1-sector2-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 2150,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 5
								},
								score: 2000,
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level1-sector2-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 2850,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 5
								},
								score: 2000,
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs:  [{
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 2740,
									y: stage.height - 100
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 10
							}
						}]
					}
				]
			},
			{
				name: 'sector3',
				cl: 'Sector',
				bounds: {
					start: 3072,
					end: 4096
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level1-sector3-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 3580,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 10
								},
								score: 500,
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			}]
		},
		{
			name: 'gui',
			cl: 'GUIConsole',
			addTo: 'null',
			attrs: [{
				name: 'heartIcon',
				cl: 'Sprite',
				attrs: {
					img: 'heart',
					start: {
						x: stage.width - 50,
						y: 20
					}
				}
			},
			{
				name: 'health',
				cl: 'Text',
				attrs: {
					x: stage.width - 100,
					y: 25,
					defaultContent: '~{health}~',
					style: { 
						font: '26px Arial', 
						fill: '#ffffff' 
					}
				}
			}]
		},
		{
			name: 'level-controls',
			cl: 'ControlButtons',
			type: 'level',
			addTo: 'null',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}]
	},

	// level 2
	{
		name: 'level2',
		cl: 'LevelState',
		world: {
			x: 0,
			y: -256,
			width: 4096,
			height: stage.height + 256
		},
		clearWorld: true,
		clearCache: false,
		bounds: {
			start: 0,
			// end: 1024
			end: 4020
		},
		attrs: [{
			name: 'scenery',
			cl: 'GroupCollection',
			attrs: [{
				name: 'sky',
				cl: 'Sprite',
				attrs: {
					img: 'sky',
					name: 'sky',
					start: {
						x: 0,
						y: 0
					},
					phaser: {
						width: stage.width,
						height: stage.height,
						fixedToCamera: true
					}
				}
			},
			{
				name: 'moving_background01',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground0a',
					start: {
						x: 0,
						y: -(stage.height * 0.5)
					},
					phaser: {
						width: 2048,
						height: stage.height * 1.5
					}
				}
			},
			{
				name: 'moving_background02',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground0b',
					start: {
						x: 2048,
						y: -(stage.height * 0.5)
					},
					phaser: {
						width: 2048,
						height: stage.height * 1.5
					}
				}
/*
			},

			{
				name: 'tree01',
				cl: 'Sprite',
				attrs: {
					img: 'tree02',
					start: {
						x: 950,
						y: (-stage.height)
					},
					phaser: {
						width: stage.height,
						height: (stage.height * 2)
					}
				}
			},
			{
				name: 'tree03',
				cl: 'Sprite',
				attrs: {
					img: 'tree01',
					start: {
						x: 1900,
						y: (-stage.height)
					},
					phaser: {
						width: stage.height,
						height: (stage.height * 2) + 20						
					}
				}
			},
			{
				name: 'tree04',
				cl: 'Sprite',
				attrs: {
					img: 'tree03',
					start: {
						x: 2190,
						y: (-stage.height)
					},
					phaser: {
						width: stage.height,
						height: stage.height * 2
					}
				}
			},
			{
				name: 'tree05',
				cl: 'Sprite',
				attrs: {
					img: 'tree04',
					phaser: {
						width: stage.height,
						height: stage.height * 2
					},
					start: {
						x: 2600,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'tree05',
				cl: 'Sprite',
				attrs: {
					img: 'tree02',
					phaser: {
						width: stage.height,
						height: stage.height * 2
					},
					start: {
						x: 3000,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'grass0',
				cl: 'Sprite',
				attrs: {
					img: 'grass1',
					start: {
						x: 0,
						y: stage.height - 220
					}
				}
			},
			{
				name: 'grass1',
				cl: 'Sprite',
				attrs: {
					img: 'grass2',
					start: {
						x: 2048,
						y: stage.height - 220
					}
				}
*/				
			}

			]
		},
		{
			name: 'terrain',
			cl: 'PhysicalGroupCollection',
			attrs: [
 			{
				name: 'leftWall',
				cl: 'Sprite',
				attrs: {
					img: 'platformV',
					start: {
						x: -16,
						y: -stage.height
					},
					phaser: {
						width: 16,
						height: stage.height * 2
					},
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'platform',
					start: {
						x: 0,
						y: world.height - 20
					},
					scale: [32, 2],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform2',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Left',
					start: {
						x: 1948,
						y: world.height - 115
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform3',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Right',
					start: {
						x: 2148,
						y: world.height - 180
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform4',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2248,
						y: world.height - 255
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform5',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 2448,
						y: world.height - 290
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform6',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2648,
						y: world.height - 300
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform7',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 2848,
						y: world.height - 290
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform8',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 3048,
						y: world.height - 280
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform9',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 3248,
						y: world.height - 300
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			}

			]
		},
		{
			name: 'sectors',
			cl: 'SectorManager',
			attrs: [{
				name: 'sector0',
				cl: 'Sector',
				bounds: {
					start: 0,
					end: 1024
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [						
						{
							name: 'level2-sector0-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								name: 'caterpillar02a-sprite',
								img: 'caterpillar02a',
								start: {
									x: 700,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 5
								},
								score: 500,
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}] 
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			},
			{
				name: 'sector1',
				cl: 'Sector',
				bounds: {
					start: 1024,
					end: 2048
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level2-sector1-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 1100,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								speed: 0.5,
								attack: 5,
								phaser: {
									health: 10
								},
								score: 1000,
								movement: {
									speed: 0.25,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			},
			{
				name: 'sector2',
				cl: 'Sector',
				bounds: {
					start: 2048,
					end: 3072
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'level2-sector2-hazard0',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2140,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						},	
						{		
							name: 'level2-sector2-hazard1',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2350,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						},	
						{		
							name: 'level2-sector2-hazard2',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2560,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						}
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level2-sector2-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 2150,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level2-sector2-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 2850,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs:  [{
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 2740,
									y: 20
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 10
							}
						}]
					}
				]
			},
			{
				name: 'sector3',
				cl: 'Sector',
				bounds: {
					start: 3072,
					end: 4096
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level2-sector3-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02a',
								start: {
									x: 3580,
									y: stage.height - 50
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 5,
								phaser: {
									health: 5
								},
								score: 500,
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: [{
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 3700,
									y: stage.height - 150
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 10
							}
						}]
					}
				]
			}]
		},
		{
			name: 'gui',
			cl: 'GUIConsole',
			addTo: 'null',
			attrs: [{
				name: 'heartIcon',
				cl: 'Sprite',
				attrs: {
					img: 'heart',
					start: {
						x: stage.width - 50,
						y: 20
					}
				}
			},
			{
				name: 'health',
				cl: 'Text',
				attrs: {
					x: stage.width - 100,
					y: 25,
					defaultContent: '~{health}~',
					style: { 
						font: '26px Arial', 
						fill: '#ffffff' 
					}
				}
			}]
		},
		{
			name: 'level-controls',
			cl: 'ControlButtons',
			type: 'level',
			addTo: 'null',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}]
	},
	// level 3
	{
		name: 'level3',
		cl: 'LevelState',
		world: {
			x: 0,
			y: -256,
			width: 4096,
			height: stage.height + 256
		},
		clearWorld: true,
		clearCache: false,
		bounds: {
			start: 0,
			// end: 1024
			end: 4020
		},
		attrs: [{
			name: 'scenery',
			cl: 'GroupCollection',
			attrs: [{
				name: 'sky',
				cl: 'Sprite',
				attrs: {
					img: 'sky',
					name: 'sky',
					start: {
						x: 0,
						y: 0
					},
					phaser: {
						width: stage.width,
						height: stage.height,
						fixedToCamera: true
					}
				}
			},
			{
				name: 'moving_background01',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground1',
					phaser: {
						width: 2048,
						height: stage.height * 1.5
					},
					start: {
						x: 0,
						y: -(stage.height * 0.5)
					}
				}
			},
			{
				name: 'moving_background02',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground2',
					phaser: {
						width: 2048,
						height: stage.height * 1.5
					},
					start: {
						x: 2048,
						y: -(stage.height * 0.5)
					}
				}
/*				
			},

			{
				name: 'tree01',
				cl: 'Sprite',
				attrs: {
					img: 'tree01',
					phaser: {
						width: stage.height,
						height: (stage.height * 2) + 20
					},
					start: {
						x: 640,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'tree02',
				cl: 'Sprite',
				attrs: {
					img: 'tree04',
					phaser: {
						width: stage.height,
						height: (stage.height * 2)
					},
					start: {
						x: 1200,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'tree02',
				cl: 'Sprite',
				attrs: {
					img: 'tree01',
					phaser: {
						width: stage.height,
						height: (stage.height * 2) + 20
					},
					start: {
						x: 1900,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'tree03',
				cl: 'Sprite',
				attrs: {
					img: 'tree03',
					phaser: {
						width: stage.height,
						height: stage.height * 2
					},
					start: {
						x: 2190,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'tree04',
				cl: 'Sprite',
				attrs: {
					img: 'tree04',
					phaser: {
						width: stage.height,
						height: stage.height * 2
					},
					start: {
						x: 2600,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'tree05',
				cl: 'Sprite',
				attrs: {
					img: 'tree02',
					phaser: {
						width: stage.height,
						height: stage.height * 2
					},
					start: {
						x: 3000,
						y: (-stage.height)
					}
				}
			},
			{
				name: 'grass0',
				cl: 'Sprite',
				attrs: {
					img: 'grass1',
					start: {
						x: 0,
						y: stage.height - 220
					}
				}
			},
			{
				name: 'grass1',
				cl: 'Sprite',
				attrs: {
					img: 'grass2',
					start: {
						x: 2048,
						y: stage.height - 220
					}
				}
*/
			}
			]
		},
		{
			name: 'terrain',
			cl: 'PhysicalGroupCollection',
			attrs: [
			{
				name: 'leftWall',
				cl: 'Sprite',
				attrs: {
					img: 'platformV',
					start: {
						x: -16,
						y: -stage.height
					},
					phaser: {
						width: 16,
						height: stage.height * 2
					},
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'platform',
					start: {
						x: 0,
						y: world.height - 20
					},
					scale: [32, 2],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform0',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Left',
					start: {
						x: 700,
						y: world.height - 115
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform1',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Right',
					start: {
						x: 900,
						y: world.height - 140
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform2',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Left',
					start: {
						x: 1948,
						y: world.height - 115
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform3',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Right',
					start: {
						x: 2148,
						y: world.height - 180
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform4',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2248,
						y: world.height - 255
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform5',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 2448,
						y: world.height - 290
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform6',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2648,
						y: world.height - 340
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform7',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 2848,
						y: world.height - 390
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform8',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 3048,
						y: world.height - 440
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform9',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 3248,
						y: world.height - 490
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			}

			]
		},
		{
			name: 'sectors',
			cl: 'SectorManager',
			attrs: [{
				name: 'sector0',
				cl: 'Sector',
				bounds: {
					start: 0,
					end: 1024
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'level3-sector0-hazard0',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 800,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						}	
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level3-sector0-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								name: 'caterpillar02b-sprite',
								img: 'caterpillar02b',
								start: {
									x: 600,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level3-sector0-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								name: 'caterpillar02b-sprite',
								img: 'caterpillar02b',
								start: {
									x: 900,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}] 
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: [{
							name: 'bonus0-sprite',
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 760,
									y: stage.height - 250
								},
								physics: {
									immovable: true
								},
								score: 500,
								health: 10
							}
						}]
					}
				]
			},
			{
				name: 'sector1',
				cl: 'Sector',
				bounds: {
					start: 1024,
					end: 2048
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level3-sector1-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 1400,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			},
			{
				name: 'sector2',
				cl: 'Sector',
				bounds: {
					start: 2048,
					end: 3072
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'level3-sector2-hazard0',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2140,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						},	
						{		
							name: 'level3-sector2-hazard1',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2350,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						},	
						{		
							name: 'level3-sector2-hazard2',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2560,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						}	
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level3-sector2-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 2200,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 2,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level3-sector2-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 2850,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 2,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}
						]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs:  [{
							cl: 'Sprite',
							attrs: {
								img: 'cupcake',
								start: {
									x: 2740,
									y: stage.height - 150
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 20
							}
						}]
					}
				]
			},
			{
				name: 'sector3',
				cl: 'Sector',
				bounds: {
					start: 3072,
					end: 4096
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [
						{
							name: 'level3-sector3-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 3090,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 5
								},
								score: 500,
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level3-sector3-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 3280,
									y: -100
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 5
								},
								score: 500,
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}
						]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: [{
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 3600,
									y: stage.height - 150
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 10
							}
						}]
					}
				]
			}]
		},
		{
			name: 'gui',
			cl: 'GUIConsole',
			addTo: 'null',
			attrs: [{
				name: 'heartIcon',
				cl: 'Sprite',
				attrs: {
					img: 'heart',
					start: {
						x: stage.width - 50,
						y: 20
					}
				}
			},
			{
				name: 'health',
				cl: 'Text',
				attrs: {
					x: stage.width - 100,
					y: 25,
					defaultContent: '~{health}~',
					style: { 
						font: '26px Arial', 
						fill: '#ffffff' 
					}
				}
			}]
		},
		{
			name: 'level-controls',
			cl: 'ControlButtons',
			type: 'level',
			addTo: 'null',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}]
	},
	// level 4
	{
		name: 'level4',
		cl: 'LevelState',
		world: {
			x: 0,
			y: -256,
			width: 4096,
			height: stage.height + 256
		},
		clearWorld: true,
		clearCache: false,
		bounds: {
			start: 0,
			// end: 1024
			end: 4020
		},
		attrs: [{
			name: 'scenery',
			cl: 'GroupCollection',
			attrs: [{
				name: 'sky',
				cl: 'Sprite',
				attrs: {
					img: 'sky',
					name: 'sky',
					phaser: {
						width: stage.width,
						height: stage.height,
						fixedToCamera: true
					},
					start: {
						x: 0,
						y: 0
					}
				}
			},
			{
				name: 'moving_background01',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground3',
					phaser: {
						width: 2048,
						height: stage.height * 1.5
					},
					start: {
						x: 0,
						y: -(stage.height * 0.5)
					}
				}
			},
			{
				name: 'moving_background02',
				cl: 'Sprite',
				attrs: {
					img: 'movingBackground4',
					phaser: {
						width: 2048,
						height: stage.height * 1.5
					},
					start: {
						x: 2048,
						y: -(stage.height * 0.5)
					}
				}
/*
			},

			{
				name: 'grass0',
				cl: 'Sprite',
				attrs: {
					img: 'grass1',
					start: {
						x: 0,
						y: stage.height - 220
					}
				}
			},
			{
				name: 'grass1',
				cl: 'Sprite',
				attrs: {
					img: 'grass2',
					start: {
						x: 2048,
						y: stage.height - 220
					}
				}
*/			}
			]
		},
		{
			name: 'terrain',
			cl: 'PhysicalGroupCollection',
			attrs: [
			{
				name: 'leftWall',
				cl: 'Sprite',
				attrs: {
					img: 'platformV',
					start: {
						x: -16,
						y: -stage.height
					},
					phaser: {
						width: 16,
						height: stage.height * 2
					},
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'platform',
					start: {
						x: 0,
						y: world.height - 20
					},
					scale: [32, 2],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform0',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Left',
					start: {
						x: 700,
						y: world.height - 115
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform1',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Right',
					start: {
						x: 900,
						y: world.height - 140
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform2',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Left',
					start: {
						x: 1948,
						y: world.height - 115
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform3',
				cl: 'Sprite',
				attrs: {
					img: 'vine01Right',
					start: {
						x: 2148,
						y: world.height - 180
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform4',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2248,
						y: world.height - 255
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform5',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 2398,
						y: world.height - 330
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform6',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2548,
						y: world.height - 405
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform7',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 2698,
						y: world.height - 480
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform8',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Left',
					start: {
						x: 2848,
						y: world.height - 555
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'platform9',
				cl: 'Sprite',
				attrs: {
					img: 'branch02Right',
					start: {
						x: 3248,
						y: world.height - 630
					},
					setSize: [64, 16, 32, 32],
					// scale: [0.6, 0.3],
					physics: {
						immovable: true
					}
				}
			}

			]
		},
		{
			name: 'sectors',
			cl: 'SectorManager',
			attrs: [{
				name: 'sector0',
				cl: 'Sector',
				bounds: {
					start: 0,
					end: 1024
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'level4-sector0-hazard0',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 800,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						}	
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level4-sector0-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								name: 'caterpillar02b-sprite',
								img: 'caterpillar02b',
								start: {
									x: 600,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								movement: {
									speed: 1,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level4-sector0-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								name: 'caterpillar02b-sprite',
								img: 'caterpillar02b',
								start: {
									x: 900,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								attack: 20,
								phaser: {
									health: 15
								},
								score: 2000,
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}] 
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: [{
							name: 'bonus0-sprite',
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 760,
									y: stage.height - 250
								},
								physics: {
									immovable: true
								},
								score: 500,
								health: 10
							}
						}]
					}
				]
			},
			{
				name: 'sector1',
				cl: 'Sector',
				bounds: {
					start: 1024,
					end: 2048
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level4-sector1-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 1400,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			},
			{
				name: 'sector2',
				cl: 'Sector',
				bounds: {
					start: 2048,
					end: 3072
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'level4-sector2-hazard0',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2140,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						},	
						{		
							name: 'level4-sector2-hazard1',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2350,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						},	
						{		
							name: 'level4-sector2-hazard2',
							cl: 'Sprite',
							attrs: {
								img: 'thorns',
								start: {
									x: 2560,
									y: world.height - 75
								},
								physics: {
									immovable: true
								},
								attack: 10
							}
						}	
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [{
							name: 'level4-sector2-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 2200,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 15
								},
								score: 2000,
								movement: {
									speed: 2,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level4-sector2-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 2850,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 10
								},
								score: 2000,
								movement: {
									speed: 2,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}
						]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs:  [{
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 2740,
									y: stage.height - 150
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 10
							}
						}]
					}
				]
			},
			{
				name: 'sector3',
				cl: 'Sector',
				bounds: {
					start: 3072,
					end: 4096
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: []
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [
						{
							name: 'level4-sector3-enemy0',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 3090,
									y: 0
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 5
								},
								score: 500,
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						},
						{
							name: 'level4-sector3-enemy1',
							cl: 'AnimatedEnemy',
							attrs: {
								img: 'caterpillar02b',
								start: {
									x: 3280,
									y: -100
								},
								physics: {
									deferredGravity: true,
									bounce: {
										x: 0,
										y: 0.2
									}
								},
								attack: 20,
								phaser: {
									health: 5
								},
								score: 500,
								movement: {
									speed: 1.5,
									type: Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED,
									formula: null
								},
								defaultAnimation: '',
								animations: caterpillarAnimations
							}
						}
						]
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: [{
							cl: 'Sprite',
							attrs: {
								img: 'lollipop',
								start: {
									x: 3600,
									y: stage.height - 150
								},
								physics: {
									immovable: true
								},
								score: 100,
								health: 10
							}
						}]
					}
				]
			}]
		},
		{
			name: 'gui',
			cl: 'GUIConsole',
			addTo: 'null',
			attrs: [{
				name: 'heartIcon',
				cl: 'Sprite',
				attrs: {
					img: 'heart',
					start: {
						x: stage.width - 50,
						y: 20
					}
				}
			},
			{
				name: 'health',
				cl: 'Text',
				attrs: {
					x: stage.width - 100,
					y: 25,
					defaultContent: '~{health}~',
					style: { 
						font: '26px Arial', 
						fill: '#ffffff' 
					}
				}
			}]
		},
		{
			name: 'level-controls',
			cl: 'ControlButtons',
			type: 'level',
			addTo: 'null',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}]
	},

	// level 5
	{
		name: 'level5',
		cl: 'LevelState',
		world: {
			x: 0,
			// y: -256,
			y: -stage.height,
			width: 4096,
			// height: stage.height + 256
			height: stage.height * 2
		},
		clearWorld: true,
		clearCache: false,
		bounds: {
			start: 0,
			// end: 1024
			end: 4020
		},
		attrs: [{
			name: 'scenery',
			cl: 'GroupCollection',
			attrs: [{
				name: 'sky',
				cl: 'Sprite',
				attrs: {
					img: 'sky',
					name: 'sky',
					start: {
						x: 0,
						y: 0
					},
					phaser: {
						width: stage.width,
						height: stage.height,
						fixedToCamera: true
					}
				}
			},
			{
				name: 'mountainBackground1a',
				cl: 'Sprite',
				attrs: {
					img: 'mountainBackground1a',
					start: {
						x: 0,
						y: -(stage.height * 0.5)
						// y: stage.height - 512
					},
					phaser: {
						width: 2048,
						height: stage.height * 1.5,
						// height: 512,
					}
				}
			},
			{
				name: 'mountainBackground1b',
				cl: 'Sprite',
				attrs: {
					img: 'mountainBackground1b',
					start: {
						x: 2048,
						y: -(stage.height * 0.5)
					},
					phaser: {
						width: 2048,
						height: stage.height * 1.5,
					}
				}
			// },
			// {
			// 	name: 'tree05',
			// 	cl: 'Sprite',
			// 	attrs: {
			// 		img: 'tree01Traced',
			// 		start: {
			// 			x: 128,
			// 			y: (-stage.height)
			// 		},
			// 		phaser: {
			// 			width: stage.height,
			// 			height: stage.height * 2,
			// 		}
			// 	}
			// },
			// {
			// 	name: 'tree04',
			// 	cl: 'Sprite',
			// 	attrs: {
			// 		img: 'tree01Traced',
			// 		start: {
			// 			x: 384,
			// 			y: (-stage.height)
			// 		},
			// 		phaser: {
			// 			width: stage.height,
			// 			height: stage.height * 2,
			// 		}
			// 	}
			}
			]
		},
		{
			name: 'terrain',
			cl: 'PhysicalGroupCollection',
			attrs: [
			{
				name: 'leftWall',
				cl: 'Sprite',
				attrs: {
					img: 'platformV',
					start: {
						x: -16,
						y: -stage.height
					},
					phaser: {
						width: 16,
						height: stage.height * 2
					},
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 0,
						y: world.height - 20
					},
					scale: [6, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 768,
						y: world.height - 50
					},
					scale: [2, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 1088,
						y: world.height - 80
					},
					scale: [1.5, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 1280,
						y: world.height - 120
					},
					scale: [2, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 1664,
						y: world.height - 150
					},
					scale: [1, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 1856,
						y: world.height - 190
					},
					scale: [1, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 2048,
						y: world.height - 240
					},
					scale: [1.5, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 2304,
						y: world.height - 280
					},
					scale: [2, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 2624,
						y: world.height - 320
					},
					scale: [1, 1],
					physics: {
						immovable: true
					}
				}
			},
			// {
			// 	name: 'ground0',
			// 	cl: 'Sprite',
			// 	attrs: {
			// 		img: 'rockPlatform1',
			// 		start: {
			// 			x: 2688,
			// 			y: world.height - 360
			// 		},
			// 		scale: [1, 1],
			// 		physics: {
			// 			immovable: true
			// 		}
			// 	}
			// },
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 2816,
						y: world.height - 400
					},
					scale: [2, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 3140,
						y: world.height - 440
					},
					scale: [1, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 3332,
						y: world.height - 500
					},
					scale: [2, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 3652,
						y: world.height - 530
					},
					scale: [1, 1],
					physics: {
						immovable: true
					}
				}
			},
			{
				name: 'ground0',
				cl: 'Sprite',
				attrs: {
					img: 'rockPlatform1',
					start: {
						x: 3844,
						y: world.height - 560
					},
					scale: [2, 1],
					physics: {
						immovable: true
					}
				}
			}
			]
		},
		{
			name: 'sectors',
			cl: 'SectorManager',
			attrs: [{
				name: 'sector0',
				cl: 'Sector',
				bounds: {
					start: 0,
					end: 1024
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'death',
							cl: 'Sprite',
							attrs: {
								img: 'invisibleBg',
								start: {
									x: 0,
									y: world.height + 100
								},
								scale: [32, 1],
								physics: {
									immovable: true
								},
								attack: 1000
							}
						}
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: [] 
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			},
			{
				name: 'sector1',
				cl: 'Sector',
				bounds: {
					start: 1024,
					end: 2048
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'death',
							cl: 'Sprite',
							attrs: {
								img: 'invisibleBg',
								start: {
									x: 1024,
									y: world.height + 100
								},
								scale: [32, 1],
								physics: {
									immovable: true
								},
								attack: 1000
							}
						}
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: []
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
					]
			},
			{
				name: 'sector2',
				cl: 'Sector',
				bounds: {
					start: 2048,
					end: 3072
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'death',
							cl: 'Sprite',
							attrs: {
								img: 'invisibleBg',
								start: {
									x: 2048,
									y: world.height + 100
								},
								scale: [32, 1],
								physics: {
									immovable: true
								},
								attack: 1000
							}
						}
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: []
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs:  []
					}
				]
			},
			{
				name: 'sector3',
				cl: 'Sector',
				bounds: {
					start: 3072,
					end: 4096
				},
				attrs: [
					{
						name: 'hazards',
						cl: 'PhysicalGroupCollection',
						attrs: [
						{
							name: 'death',
							cl: 'Sprite',
							attrs: {
								img: 'invisibleBg',
								start: {
									x: 3072,
									y: world.height + 100
								},
								scale: [32, 1],
								physics: {
									immovable: true
								},
								attack: 1000
							}
						}
						]
					},
					{
						name: 'enemies',
						cl: 'Enemies',
						attrs: []
					},
					{
						name: 'bonuses',
						cl: 'PhysicalGroupCollection',
						attrs: []
					}
				]
			}]
		},
		{
			name: 'gui',
			cl: 'GUIConsole',
			addTo: 'null',
			attrs: [{
				name: 'heartIcon',
				cl: 'Sprite',
				attrs: {
					img: 'heart',
					start: {
						x: stage.width - 50,
						y: 20
					}
				}
			},
			{
				name: 'health',
				cl: 'Text',
				attrs: {
					x: stage.width - 100,
					y: 25,
					defaultContent: '~{health}~',
					style: { 
						font: '26px Arial', 
						fill: '#ffffff' 
					}
				}
			}]
		},
		{
			name: 'level-controls',
			cl: 'ControlButtons',
			type: 'level',
			addTo: 'null',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}]
	},
	// intermission
	{
		name: 'intermission',
		cl: 'MenuState',
		world: {
			x: 0,
			y: 0,
			width: stage.width,
			height: stage.height
		},
		clearWorld: true,
		clearCache: false,
		attrs: [
		{
			name: 'intermission-group',
			cl: 'GroupCollection',
			attrs: [
			{
				name: 'bg',
				cl: 'Sprite',
				attrs: {
					img: 'greyRect',
					start: {
						x: 20,
						y: 20 
					},
					phaser: {
						width: stage.width - 40,
						height: stage.height - 40
					}
				}
			},
			{
				name: 'title',
				cl: 'Text',
				attrs: {
					centerX: true,
					centerY: false,
					x: 0,
					y: 40,
					defaultContent: 'Level ~{currentLevel}~ Completed',
					style: { 
						font: '30px Arial', 
						fill: '#000000',
						align: 'center'
					}
				}
			},
			{
				name: 'score',
				cl: 'Text',
				attrs: {
					centerX: true,
					centerY: false,
					x: 0,
					y: 100,
					defaultContent: 'Score: ~{score}~',
					style: { 
						font: '18px Arial', 
						fill: '#000000',
						align: 'center'
					}
				}
			}
			]
		},
		{
			name: 'menu-controls',
			cl: 'ControlButtons',
			type: 'intermission',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}
		]
	},
	// completed
	{
		name: 'completed',
		cl: 'MenuState',
		world: {
			x: 0,
			y: 0,
			width: stage.width,
			height: stage.height
		},
		clearWorld: true,
		clearCache: false,
		attrs: [
		{
			name: 'completed-group',
			cl: 'GroupCollection',
			attrs: [
			{
				name: 'bg',
				cl: 'Sprite',
				attrs: {
					img: 'greyRect',
					start: {
						x: 20,
						y: 20 
					},
					phaser: {
						width: stage.width - 40,
						height: stage.height - 40
					}
				}
			},
			{
				name: 'title',
				cl: 'Text',
				attrs: {
					centerX: true,
					centerY: false,
					x: 0,
					y: 40,
					defaultContent: 'All Completed',
					style: { 
						font: '30px Arial', 
						fill: '#000000',
						align: 'center'
					}
				}
			},
			{
				name: 'score',
				cl: 'Text',
				attrs: {
					centerX: true,
					centerY: false,
					x: 0,
					y: 100,
					defaultContent: 'Score: ~{score}~',
					style: { 
						font: '18px Arial', 
						fill: '#000000',
						align: 'center'
					}
				}
			}
			]
		},
		{
			name: 'completed-controls',
			cl: 'ControlButtons',
			type: 'completed',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}
		]
	},
	// gameOver
	{
		name: 'gameOver',
		cl: 'MenuState',
		world: {
			x: 0,
			y: 0,
			width: stage.width,
			height: stage.height
		},
		clearWorld: true,
		clearCache: false,
		attrs: [{
			name: 'gameOver-group',
			cl: 'GroupCollection',
			attrs: [
			{
				name: 'bg',
				cl: 'Sprite',
				attrs: {
					img: 'greyRect',
					start: {
						x: 20,
						y: 20
					},
					phaser: {
						// fixedToCamera: true,
						width: stage.width - 40,
						height: stage.height - 40
					}
				}
			},
			{
				name: 'title',
				cl: 'Text',
				attrs: {
					centerX: true,
					centerY: true,
					x: stage.width/2,
					y: 40,
					defaultContent: 'Game Over',
					fixedToCamera: true,
					style: { 
						font: '30px Arial', 
						fill: '#000000',
						align: 'center'
					}
				}
			}
			]
		},
		{
			name: 'gameOver-controls',
			cl: 'ControlButtons',
			type: 'gameOver',
			attrs: {
				start: {
					x: 0,
					y: 0
				}
			}
		}
		]
	}],

	player: {
		name: 'keke',
		cl: 'AnimatedPlayer',
		attrs: {
			img: 'keke',
			phaser: {
				health: 100,
				width: 95,
				height: 113
			},
			setSize: [51, 113],
			start: {
				// x: stage.width/2 - 95/2,
				x: 500,
				y: stage.height - 128
			},
			physics: {
				bounce: {
					x: 0,
					y: 0.2
				},
				collideWorldBounds: false
			},
			anchor: {
				x: 0.5,
				y: 0.5
			},
			followStyle: Phaser.Camera.FOLLOW_PLATFORMER,
			speed: {
				x: 150,
				y: 400
			},
			controls: {
				left: Polyworks.InputCodes.LEFT,
				right: Polyworks.InputCodes.RIGHT,
				jump: Polyworks.InputCodes.UP
			},
			attack: 5,
			jumping: false,
			justJumped: false,
			defaultAnimation: 'idleL',
			animations: kekeAnimations,
			facingForward: true
		}
	}
};

