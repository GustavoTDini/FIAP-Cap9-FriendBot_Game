//Classe com os elementos de imagem e sprites
class Images{

    static SPRITE_SIZE = 128;
    static LARGE_SPRITE_SIZE = 4*Images.SPRITE_SIZE

    static imageFiles = {
        beach_sky: new Image(),
        beach_bc_1: new Image(),
        beach_bc_2: new Image(),
        beach_bc_3: new Image(),
        beach_texture_1: new Image(),
        beach_texture_2: new Image(),
        beach_texture_3: new Image(),
        beach_road_sprite_1: new Image(),
        beach_road_sprite_2: new Image(),
        beach_road_sprite_3: new Image(),
        beach_road_sprite_4: new Image(),
        beach_road_sprite_5: new Image(),
        city_sky: new Image(),
        city_bc_1: new Image(),
        city_bc_2: new Image(),
        city_bc_3: new Image(),
        city_texture_1: new Image(),
        city_texture_2: new Image(),
        city_texture_3: new Image(),
        city_road_sprite_1: new Image(),
        city_road_sprite_2: new Image(),
        city_road_sprite_3: new Image(),
        city_road_sprite_4: new Image(),
        city_road_sprite_5: new Image(),
        farm_sky: new Image(),
        farm_bc_1: new Image(),
        farm_bc_2: new Image(),
        farm_bc_3: new Image(),
        farm_texture_1: new Image(),
        farm_texture_2: new Image(),
        farm_texture_3: new Image(),
        farm_road_sprite_1: new Image(),
        farm_road_sprite_2: new Image(),
        farm_road_sprite_3: new Image(),
        farm_road_sprite_4: new Image(),
        farm_road_sprite_5: new Image(),
        forest_sky: new Image(),
        forest_bc_1: new Image(),
        forest_bc_2: new Image(),
        forest_bc_3: new Image(),
        forest_texture_1: new Image(),
        forest_texture_2: new Image(),
        forest_texture_3: new Image(),
        forest_road_sprite_1: new Image(),
        forest_road_sprite_2: new Image(),
        forest_road_sprite_3: new Image(),
        forest_road_sprite_4: new Image(),
        forest_road_sprite_5: new Image(),
        sub_sky: new Image(),
        sub_bc_1: new Image(),
        sub_bc_2: new Image(),
        sub_bc_3: new Image(),
        sub_texture_1: new Image(),
        sub_texture_2: new Image(),
        sub_texture_3: new Image(),
        sub_road_sprite_1: new Image(),
        sub_road_sprite_2: new Image(),
        sub_road_sprite_3: new Image(),
        sub_road_sprite_4: new Image(),
        sub_road_sprite_5: new Image(),
        racers_spritesheet: new Image(),
        GUI_Spritesheet: new Image(),
        items_spritesheet: new Image(),
        menu_spritesheet: new Image(),
        power_ups_icons_spritesheet: new Image(),
        explosions_spritesheet: new Image(),
        start_spritesheet: new Image(),
        game_over_spritesheet: new Image(),
        scenario_common_spritesheet: new Image(),
        beach_spritesheet: new Image(),
        scenario_beach_spritesheet: new Image(),
        city_spritesheet: new Image(),
        scenario_city_spritesheet: new Image(),
        farm_spritesheet: new Image(),
        scenario_farm_spritesheet: new Image(),
        forest_spritesheet: new Image(),
        scenario_forest_spritesheet: new Image(),
        suburb_spritesheet: new Image(),
        scenario_sub_spritesheet: new Image(),
        get_ready_spritesheet: new Image(),
        start_road_sprite_1: new Image(),
        start_road_sprite_2: new Image(),
        y_road_screen_signs: new Image(),
        scenario_tunnel_spritesheet: new Image()
    }

// ---------------------------------------------------------------------------------
// Player Sprites
// ---------------------------------------------------------------------------------
    static greenCarMaxSteerLeft_1 = [Images.imageFiles.racers_spritesheet, 0, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarMaxSteerLeft_2 = [Images.imageFiles.racers_spritesheet, 0, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarMaxSteerLeft_3 = [Images.imageFiles.racers_spritesheet, 0, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarSteerLeft_1 = [Images.imageFiles.racers_spritesheet, 128, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarSteerLeft_2 = [Images.imageFiles.racers_spritesheet, 128, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarSteerLeft_3 = [Images.imageFiles.racers_spritesheet, 128, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarCenter_1 = [Images.imageFiles.racers_spritesheet, 256, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarCenter_2 = [Images.imageFiles.racers_spritesheet, 256, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarCenter_3 = [Images.imageFiles.racers_spritesheet, 256, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarSteerRight_1 = [Images.imageFiles.racers_spritesheet, 384, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarSteerRight_2 = [Images.imageFiles.racers_spritesheet, 384, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarSteerRight_3 = [Images.imageFiles.racers_spritesheet, 384, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarMaxSteerRight_1 = [Images.imageFiles.racers_spritesheet, 512, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarMaxSteerRight_2 = [Images.imageFiles.racers_spritesheet, 512, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static greenCarMaxSteerRight_3 = [Images.imageFiles.racers_spritesheet, 512, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

    static pinkCarMaxSteerLeft_1 = [Images.imageFiles.racers_spritesheet, 0, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarMaxSteerLeft_2 = [Images.imageFiles.racers_spritesheet, 0, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarMaxSteerLeft_3 = [Images.imageFiles.racers_spritesheet, 0, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarSteerLeft_1 = [Images.imageFiles.racers_spritesheet, 128, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarSteerLeft_2 = [Images.imageFiles.racers_spritesheet, 128, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarSteerLeft_3 = [Images.imageFiles.racers_spritesheet, 128, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarCenter_1 = [Images.imageFiles.racers_spritesheet, 256, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarCenter_2 = [Images.imageFiles.racers_spritesheet, 256, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarCenter_3 = [Images.imageFiles.racers_spritesheet, 256, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarSteerRight_1 = [Images.imageFiles.racers_spritesheet, 384, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarSteerRight_2 = [Images.imageFiles.racers_spritesheet, 384, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarSteerRight_3 = [Images.imageFiles.racers_spritesheet, 384, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarMaxSteerRight_1 = [Images.imageFiles.racers_spritesheet, 512, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarMaxSteerRight_2 = [Images.imageFiles.racers_spritesheet, 512, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pinkCarMaxSteerRight_3 = [Images.imageFiles.racers_spritesheet, 512, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

    static blueCarMaxSteerLeft_1 = [Images.imageFiles.racers_spritesheet, 768, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarMaxSteerLeft_2 = [Images.imageFiles.racers_spritesheet, 768, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarMaxSteerLeft_3 = [Images.imageFiles.racers_spritesheet, 768, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarSteerLeft_1 = [Images.imageFiles.racers_spritesheet, 640, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarSteerLeft_2 = [Images.imageFiles.racers_spritesheet, 640, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarSteerLeft_3 = [Images.imageFiles.racers_spritesheet, 640, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarCenter_1 = [Images.imageFiles.racers_spritesheet, 640, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarCenter_2 = [Images.imageFiles.racers_spritesheet, 640, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarCenter_3 = [Images.imageFiles.racers_spritesheet, 640, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarSteerRight_1 = [Images.imageFiles.racers_spritesheet, 768, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarSteerRight_2 = [Images.imageFiles.racers_spritesheet, 768, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarSteerRight_3 = [Images.imageFiles.racers_spritesheet, 768, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarMaxSteerRight_1 = [Images.imageFiles.racers_spritesheet, 896, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarMaxSteerRight_2 = [Images.imageFiles.racers_spritesheet, 896, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static blueCarMaxSteerRight_3 = [Images.imageFiles.racers_spritesheet, 896, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Racers Sprites
// ---------------------------------------------------------------------------------
    static racerShark = [Images.imageFiles.racers_spritesheet, 1024, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerGiraffe = [Images.imageFiles.racers_spritesheet, 896, 512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerBear = [Images.imageFiles.racers_spritesheet, 1024, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerPolarBear = [Images.imageFiles.racers_spritesheet, 896, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerMonkey = [Images.imageFiles.racers_spritesheet, 896, 640, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerPanda1 = [Images.imageFiles.racers_spritesheet, 1024, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerPanda2 = [Images.imageFiles.racers_spritesheet, 1024, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static racerPanda3 = [Images.imageFiles.racers_spritesheet, 1024, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Items Sprites
// ---------------------------------------------------------------------------------
    static coin1 = [Images.imageFiles.items_spritesheet, 0, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static coin2 = [Images.imageFiles.items_spritesheet, 128, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static coin3 = [Images.imageFiles.items_spritesheet, 256, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static coin4 = [Images.imageFiles.items_spritesheet, 384, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static coin5 = [Images.imageFiles.items_spritesheet, 512, 0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static coin6 = [Images.imageFiles.items_spritesheet, 0, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static gas1 = [Images.imageFiles.items_spritesheet, 128, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static gas2 = [Images.imageFiles.items_spritesheet, 256, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static gas3 = [Images.imageFiles.items_spritesheet, 384, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static gas4 = [Images.imageFiles.items_spritesheet, 512, 128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static gas5 = [Images.imageFiles.items_spritesheet, 0, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static gas6 = [Images.imageFiles.items_spritesheet, 128, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static boltItem1 = [Images.imageFiles.items_spritesheet, 256, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static boltItem2 = [Images.imageFiles.items_spritesheet, 384, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turboItem1 = [Images.imageFiles.items_spritesheet, 512, 256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turboItem2 = [Images.imageFiles.items_spritesheet, 0, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static shieldItem1 = [Images.imageFiles.items_spritesheet, 128, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static shieldItem2 = [Images.imageFiles.items_spritesheet, 256, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static doubleItem1 = [Images.imageFiles.items_spritesheet, 384, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static doubleItem2 = [Images.imageFiles.items_spritesheet, 512, 384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Start Sprites
// ---------------------------------------------------------------------------------
    static go1 = [Images.imageFiles.start_spritesheet, 0, 0, 750, 100]
    static go2 = [Images.imageFiles.start_spritesheet, 0, 100, 750, 100]
    static lights_out = [Images.imageFiles.start_spritesheet, 0, 201, 199, 350]
    static lights_red = [Images.imageFiles.start_spritesheet, 200, 201, 199, 350]
    static lights_green = [Images.imageFiles.start_spritesheet, 400, 201, 199, 350]

// ---------------------------------------------------------------------------------
// Effects Sprites
// ---------------------------------------------------------------------------------
    static star1 = [Images.imageFiles.explosions_spritesheet, 0, 0, 64, 64]
    static star2 = [Images.imageFiles.explosions_spritesheet, 64, 0, 64, 64]
    static star3 = [Images.imageFiles.explosions_spritesheet, 128, 0, 64, 64]
    static star4 = [Images.imageFiles.explosions_spritesheet, 192, 0, 64, 64]
    static star5 = [Images.imageFiles.explosions_spritesheet, 0,  64, 64, 64]
    static star6 = [Images.imageFiles.explosions_spritesheet, 64, 64, 64, 64]
    static star7 = [Images.imageFiles.explosions_spritesheet, 128, 64, 64, 64]
    static star8 = [Images.imageFiles.explosions_spritesheet, 192, 64, 64, 64]
    static star9 = [Images.imageFiles.explosions_spritesheet, 0,  128, 64, 64]
    static star10 = [Images.imageFiles.explosions_spritesheet,64, 128, 64, 64]
    static star11 = [Images.imageFiles.explosions_spritesheet,128, 128, 64, 64]
    static star12 = [Images.imageFiles.explosions_spritesheet,192, 128, 64, 64]
    static star13 = [Images.imageFiles.explosions_spritesheet, 0,  192, 64, 64]
    static star14 = [Images.imageFiles.explosions_spritesheet, 64, 192, 64, 64]
    static star15 = [Images.imageFiles.explosions_spritesheet, 128, 192, 64, 64]
    static star16 = [Images.imageFiles.explosions_spritesheet, 192, 192, 64, 64]
    static explosion1 = [Images.imageFiles.explosions_spritesheet, 256, 0, 128, 128]
    static explosion2 = [Images.imageFiles.explosions_spritesheet, 384, 0, 128, 128]
    static explosion3 = [Images.imageFiles.explosions_spritesheet, 512, 0, 128, 128]
    static explosion4 = [Images.imageFiles.explosions_spritesheet, 640, 0, 128, 128]
    static explosion5 = [Images.imageFiles.explosions_spritesheet, 768,  0, 128, 128]
    static explosion6 = [Images.imageFiles.explosions_spritesheet, 896 , 0, 128, 128]
    static explosion7 = [Images.imageFiles.explosions_spritesheet, 1024, 0, 128, 128]
    static explosion8 = [Images.imageFiles.explosions_spritesheet, 1152, 0, 128, 128]
    static explosion9 = [Images.imageFiles.explosions_spritesheet, 1280,  0, 128, 128]
    static explosion10 = [Images.imageFiles.explosions_spritesheet, 1280,  256, 128, 128]
    static turbo1 = [Images.imageFiles.explosions_spritesheet, 256, 128, 64, 64]
    static turbo2 = [Images.imageFiles.explosions_spritesheet, 320, 128, 64, 64]
    static turbo3 = [Images.imageFiles.explosions_spritesheet, 384, 128, 64, 64]
    static turbo4 = [Images.imageFiles.explosions_spritesheet, 448, 128, 64, 64]
    static turbo5 = [Images.imageFiles.explosions_spritesheet, 512, 128, 64, 64]
    static turbo6 = [Images.imageFiles.explosions_spritesheet, 576, 128, 64, 64]
    static turbo7 = [Images.imageFiles.explosions_spritesheet, 640, 128, 64, 64]
    static turbo8 = [Images.imageFiles.explosions_spritesheet, 704, 128, 64, 64]
    static turbo9 = [Images.imageFiles.explosions_spritesheet, 768, 128, 64, 64]
    static fire1 = [Images.imageFiles.explosions_spritesheet, 256, 192, 64, 64]
    static fire2 = [Images.imageFiles.explosions_spritesheet, 320, 192, 64, 64]
    static fire3 = [Images.imageFiles.explosions_spritesheet, 384, 192, 64, 64]
    static fire4 = [Images.imageFiles.explosions_spritesheet, 448, 192, 64, 64]
    static fire5 = [Images.imageFiles.explosions_spritesheet, 512, 192, 64, 64]
    static fire6 = [Images.imageFiles.explosions_spritesheet, 576, 192, 64, 64]
    static fire7 = [Images.imageFiles.explosions_spritesheet, 640, 192, 64, 64]
    static fire8 = [Images.imageFiles.explosions_spritesheet, 704, 192, 64, 64]
    static fire9 = [Images.imageFiles.explosions_spritesheet, 768, 192, 64, 64]
    static shield1 = [Images.imageFiles.explosions_spritesheet, 0, 256, 128, 128]
    static shield2 = [Images.imageFiles.explosions_spritesheet, 128, 256, 128, 128]
    static shield3 = [Images.imageFiles.explosions_spritesheet, 256, 256, 128, 128]
    static shield4 = [Images.imageFiles.explosions_spritesheet, 384, 256, 128, 128]
    static shield5 = [Images.imageFiles.explosions_spritesheet, 512, 256, 128, 128]
    static shield6 = [Images.imageFiles.explosions_spritesheet, 640, 256, 128, 128]
    static shield7 = [Images.imageFiles.explosions_spritesheet, 768, 256, 128, 128]
    static shield8 = [Images.imageFiles.explosions_spritesheet, 896, 256, 128, 128]
    static glitter1 = [Images.imageFiles.explosions_spritesheet, 896  , 128, 128, 128]
    static glitter2 = [Images.imageFiles.explosions_spritesheet, 1024, 128, 128, 128]
    static glitter3 = [Images.imageFiles.explosions_spritesheet, 1152, 128, 128, 128]
    static glitter4 = [Images.imageFiles.explosions_spritesheet, 1280, 128, 128, 128]
    static glitter5 = [Images.imageFiles.explosions_spritesheet, 1024, 256, 128, 128]
    static glitter6 = [Images.imageFiles.explosions_spritesheet, 1152, 256, 128, 128]
    static game_over1 = [Images.imageFiles.game_over_spritesheet, 0 , 0, 675, 150]
    static game_over2 = [Images.imageFiles.game_over_spritesheet, 675, 0, 675, 150]
    static game_over3 = [Images.imageFiles.game_over_spritesheet, 1350, 0, 675, 150]
    static game_over4 = [Images.imageFiles.game_over_spritesheet, 2025, 0, 675, 150]
    static game_over5 = [Images.imageFiles.game_over_spritesheet, 2700, 0, 675, 150]
    static game_over6 = [Images.imageFiles.game_over_spritesheet, 3375, 0, 675, 150]
    static game_over7 = [Images.imageFiles.game_over_spritesheet, 0 , 150, 675, 150]
    static game_over8 = [Images.imageFiles.game_over_spritesheet, 675, 150, 675, 150]
    static game_over9 = [Images.imageFiles.game_over_spritesheet, 1350, 150, 675, 150]
    static game_over10 = [Images.imageFiles.game_over_spritesheet, 2025, 150, 675, 150]
    static game_over11 = [Images.imageFiles.game_over_spritesheet, 2700, 150, 675, 150]
    static game_over12 = [Images.imageFiles.game_over_spritesheet, 3375, 150, 675, 150]
    static game_over13 = [Images.imageFiles.game_over_spritesheet, 0 , 300, 675, 150]
    static game_over14 = [Images.imageFiles.game_over_spritesheet, 675, 300, 675, 150]
    static game_over15 = [Images.imageFiles.game_over_spritesheet, 1350, 300, 675, 150]
    static game_over16 = [Images.imageFiles.game_over_spritesheet, 2025, 300, 675, 150]
    static game_over17 = [Images.imageFiles.game_over_spritesheet, 2700, 300, 675, 150]
    static game_over18 = [Images.imageFiles.game_over_spritesheet, 3375, 300, 675, 150]
    static game_over19 = [Images.imageFiles.game_over_spritesheet, 0 , 450, 675, 150]
    static game_over20 = [Images.imageFiles.game_over_spritesheet, 675, 450, 675, 150]
    static game_over21 = [Images.imageFiles.game_over_spritesheet, 1350, 450, 675, 150]
    static game_over22 = [Images.imageFiles.game_over_spritesheet, 2025, 450, 675, 150]
    static game_over23 = [Images.imageFiles.game_over_spritesheet, 2700, 450, 675, 150]
    static game_over24 = [Images.imageFiles.game_over_spritesheet, 3375, 450, 675, 150]
    static game_over25 = [Images.imageFiles.game_over_spritesheet, 0 , 600, 675, 150]
    static game_over26 = [Images.imageFiles.game_over_spritesheet, 675, 600, 675, 150]
    static game_over27 = [Images.imageFiles.game_over_spritesheet, 1350, 600, 675, 150]
    static game_over28 = [Images.imageFiles.game_over_spritesheet, 2025, 600, 675, 150]
    static get_ready1 = [Images.imageFiles.get_ready_spritesheet, 0 , 0, 675, 150]
    static get_ready2 = [Images.imageFiles.get_ready_spritesheet, 675, 0, 675, 150]
    static get_ready3 = [Images.imageFiles.get_ready_spritesheet, 1350, 0, 675, 150]
    static get_ready4 = [Images.imageFiles.get_ready_spritesheet, 2025, 0, 675, 150]
    static get_ready5 = [Images.imageFiles.get_ready_spritesheet, 2700, 0, 675, 150]
    static get_ready6 = [Images.imageFiles.get_ready_spritesheet, 3375, 0, 675, 150]
    static get_ready7 = [Images.imageFiles.get_ready_spritesheet,  0 , 150, 675, 150]
    static get_ready8 = [Images.imageFiles.get_ready_spritesheet,  675,150, 675, 150]
    static get_ready9 = [Images.imageFiles.get_ready_spritesheet,  1350, 150, 675, 150]
    static get_ready10 = [Images.imageFiles.get_ready_spritesheet, 2025, 150, 675, 150]
    static get_ready11 = [Images.imageFiles.get_ready_spritesheet, 2700, 150, 675, 150]
    static get_ready12 = [Images.imageFiles.get_ready_spritesheet, 3375, 150, 675, 150]
    static get_ready13 = [Images.imageFiles.get_ready_spritesheet, 0 , 300, 675, 150]
    static get_ready14 = [Images.imageFiles.get_ready_spritesheet, 675, 300, 675, 150]
    static get_ready15 = [Images.imageFiles.get_ready_spritesheet, 1350, 300, 675, 150]
    static get_ready16 = [Images.imageFiles.get_ready_spritesheet, 2025, 300, 675, 150]
    static get_ready17 = [Images.imageFiles.get_ready_spritesheet, 2700, 300, 675, 150]
    static get_ready18 = [Images.imageFiles.get_ready_spritesheet, 3375, 300, 675, 150]
    static get_ready19 = [Images.imageFiles.get_ready_spritesheet, 0 , 450, 675, 150]
    static get_ready20 = [Images.imageFiles.get_ready_spritesheet, 675, 450, 675, 150]
    static get_ready21 = [Images.imageFiles.get_ready_spritesheet, 1350, 450, 675, 150]
    static get_ready22 = [Images.imageFiles.get_ready_spritesheet, 2025, 450, 675, 150]
    static get_ready23 = [Images.imageFiles.get_ready_spritesheet, 2700, 450, 675, 150]
    static get_ready24 = [Images.imageFiles.get_ready_spritesheet, 3375, 450, 675, 150]
    static get_ready25 = [Images.imageFiles.get_ready_spritesheet, 0 , 600, 675, 150]
    static get_ready26 = [Images.imageFiles.get_ready_spritesheet, 675, 600, 675, 150]
    static get_ready27 = [Images.imageFiles.get_ready_spritesheet, 1350, 600, 675, 150]
    static get_ready28 = [Images.imageFiles.get_ready_spritesheet, 2025, 600, 675, 150]
    static get_ready29 = [Images.imageFiles.get_ready_spritesheet, 2700, 600, 675, 150]
    static get_ready30 = [Images.imageFiles.get_ready_spritesheet, 3375, 600, 675, 150]
    static get_ready31 = [Images.imageFiles.get_ready_spritesheet, 0 , 750, 675, 150]
    static get_ready32 = [Images.imageFiles.get_ready_spritesheet, 675, 750, 675, 150]
    static get_ready33 = [Images.imageFiles.get_ready_spritesheet, 1350, 750, 675, 150]
    static get_ready34 = [Images.imageFiles.get_ready_spritesheet, 2025, 750, 675, 150]
    static get_ready35 = [Images.imageFiles.get_ready_spritesheet, 2700, 750, 675, 150]
    static gotItem1 = [Images.imageFiles.explosions_spritesheet, 1408, 0, 64, 64]
    static gotItem2 = [Images.imageFiles.explosions_spritesheet, 1408, 64, 64, 64]
    static gotItem3 = [Images.imageFiles.explosions_spritesheet, 1408, 128, 64, 64]
    static gotItem4 = [Images.imageFiles.explosions_spritesheet, 1408, 192, 64, 64]
// ---------------------------------------------------------------------------------
// Forest Sprites Inroad
// ---------------------------------------------------------------------------------
    static guara1Left = [Images.imageFiles.forest_spritesheet   , 0  ,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara2Left = [Images.imageFiles.forest_spritesheet   , 128,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara3Left = [Images.imageFiles.forest_spritesheet   , 256,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara4Left = [Images.imageFiles.forest_spritesheet   , 384,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guaraStopped = [Images.imageFiles.forest_spritesheet , 512,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara1Right = [Images.imageFiles.forest_spritesheet  , 0  ,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara2Right = [Images.imageFiles.forest_spritesheet  , 128,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara3Right = [Images.imageFiles.forest_spritesheet  , 256,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static guara4Right = [Images.imageFiles.forest_spritesheet  , 384,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguarStopped = [Images.imageFiles.forest_spritesheet, 512,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar1Left = [Images.imageFiles.forest_spritesheet  , 0  ,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar2Left = [Images.imageFiles.forest_spritesheet  , 128,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar3Left = [Images.imageFiles.forest_spritesheet  , 256,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar4Left = [Images.imageFiles.forest_spritesheet  , 384,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static rock = [Images.imageFiles.forest_spritesheet         , 512,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar1Right = [Images.imageFiles.forest_spritesheet , 0  ,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar2Right = [Images.imageFiles.forest_spritesheet , 128,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar3Right = [Images.imageFiles.forest_spritesheet , 256,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jaguar4Right = [Images.imageFiles.forest_spritesheet , 384,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static tree = [Images.imageFiles.forest_spritesheet         , 512,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jeep1 = [Images.imageFiles.forest_spritesheet        , 0  ,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jeep2 = [Images.imageFiles.forest_spritesheet        , 128,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jeep3 = [Images.imageFiles.forest_spritesheet        , 256,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jeep4 = [Images.imageFiles.forest_spritesheet        , 384,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static jeep5 = [Images.imageFiles.forest_spritesheet        , 512,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Forest Side Road Sprites
// ---------------------------------------------------------------------------------
    static forestScenarioHouse1 = [Images.imageFiles.scenario_forest_spritesheet, 0, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioHouse2 = [Images.imageFiles.scenario_forest_spritesheet, 512, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioHouse3 = [Images.imageFiles.scenario_forest_spritesheet, 1024, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioRock1 = [Images.imageFiles.scenario_forest_spritesheet, 1536, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioRock2 = [Images.imageFiles.scenario_forest_spritesheet, 0, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioTree1 = [Images.imageFiles.scenario_forest_spritesheet, 512, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioTree2 = [Images.imageFiles.scenario_forest_spritesheet, 1024, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioTree3 = [Images.imageFiles.scenario_forest_spritesheet, 1536, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioTree4 = [Images.imageFiles.scenario_forest_spritesheet, 0, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioRock3 = [Images.imageFiles.scenario_forest_spritesheet, 512, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioTree5 = [Images.imageFiles.scenario_forest_spritesheet, 1024, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static forestScenarioTree6 = [Images.imageFiles.scenario_forest_spritesheet, 1536, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Farm Sprites Inroad
// ---------------------------------------------------------------------------------
    static bull1Left = [Images.imageFiles.farm_spritesheet   , 0  ,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull2Left = [Images.imageFiles.farm_spritesheet   , 128,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull3Left = [Images.imageFiles.farm_spritesheet   , 256,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull4Left = [Images.imageFiles.farm_spritesheet   , 384,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bullStopped = [Images.imageFiles.farm_spritesheet , 512,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull1Right = [Images.imageFiles.farm_spritesheet  , 0  ,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull2Right = [Images.imageFiles.farm_spritesheet  , 128,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull3Right = [Images.imageFiles.farm_spritesheet  , 256,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static bull4Right = [Images.imageFiles.farm_spritesheet  , 384,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horseStopped = [Images.imageFiles.farm_spritesheet, 512,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse1Left = [Images.imageFiles.farm_spritesheet  , 0  ,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse2Left = [Images.imageFiles.farm_spritesheet  , 128,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse3Left = [Images.imageFiles.farm_spritesheet  , 256,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse4Left = [Images.imageFiles.farm_spritesheet  , 384,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static log = [Images.imageFiles.farm_spritesheet         , 512,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse1Right = [Images.imageFiles.farm_spritesheet , 0  ,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse2Right = [Images.imageFiles.farm_spritesheet , 128,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse3Right = [Images.imageFiles.farm_spritesheet , 256,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static horse4Right = [Images.imageFiles.farm_spritesheet , 384,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static truck = [Images.imageFiles.farm_spritesheet         , 512,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pickup1 = [Images.imageFiles.farm_spritesheet        , 0  ,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pickup2 = [Images.imageFiles.farm_spritesheet        , 128,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pickup3 = [Images.imageFiles.farm_spritesheet        , 256,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pickup4 = [Images.imageFiles.farm_spritesheet        , 384,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static pickup5 = [Images.imageFiles.farm_spritesheet        , 512,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Farm Side Road Sprites
// ---------------------------------------------------------------------------------
    static farmScenarioBush = [Images.imageFiles.scenario_farm_spritesheet, 0, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioCorn = [Images.imageFiles.scenario_farm_spritesheet, 512, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioFences = [Images.imageFiles.scenario_farm_spritesheet, 1024, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioShed = [Images.imageFiles.scenario_farm_spritesheet, 1536, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioWindmill = [Images.imageFiles.scenario_farm_spritesheet, 0, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioScarecrow = [Images.imageFiles.scenario_farm_spritesheet, 512, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioHay = [Images.imageFiles.scenario_farm_spritesheet, 1024, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioWell = [Images.imageFiles.scenario_farm_spritesheet, 1536, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioRock1 = [Images.imageFiles.scenario_farm_spritesheet, 0, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioRock2 = [Images.imageFiles.scenario_farm_spritesheet, 512, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioTree1 = [Images.imageFiles.scenario_farm_spritesheet, 1024, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static farmScenarioTree2 = [Images.imageFiles.scenario_farm_spritesheet, 1536, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// City Sprites Inroad
// ---------------------------------------------------------------------------------
    static cityDog1Left = [Images.imageFiles.city_spritesheet   , 0  ,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog2Left = [Images.imageFiles.city_spritesheet   , 128,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog3Left = [Images.imageFiles.city_spritesheet   , 256,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog4Left = [Images.imageFiles.city_spritesheet   , 384,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDogStopped = [Images.imageFiles.city_spritesheet , 512,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog1Right = [Images.imageFiles.city_spritesheet  , 0  ,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog2Right = [Images.imageFiles.city_spritesheet  , 128,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog3Right = [Images.imageFiles.city_spritesheet  , 256,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cityDog4Right = [Images.imageFiles.city_spritesheet  , 384,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivaraStopped = [Images.imageFiles.city_spritesheet, 512,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara1Left = [Images.imageFiles.city_spritesheet  , 0  ,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara2Left = [Images.imageFiles.city_spritesheet  , 128,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara3Left = [Images.imageFiles.city_spritesheet  , 256,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara4Left = [Images.imageFiles.city_spritesheet  , 384,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static construction = [Images.imageFiles.city_spritesheet         , 512,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara1Right = [Images.imageFiles.city_spritesheet , 0  ,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara2Right = [Images.imageFiles.city_spritesheet , 128,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara3Right = [Images.imageFiles.city_spritesheet , 256,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static capivara4Right = [Images.imageFiles.city_spritesheet , 384,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static trash = [Images.imageFiles.city_spritesheet         , 512,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static car1 = [Images.imageFiles.city_spritesheet        , 0  ,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static car2 = [Images.imageFiles.city_spritesheet        , 128,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static car3 = [Images.imageFiles.city_spritesheet        , 256,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static car4 = [Images.imageFiles.city_spritesheet        , 384,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static car5 = [Images.imageFiles.city_spritesheet        , 512,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// City Side Road Sprites
// ---------------------------------------------------------------------------------
    static cityScenarioBuilding1 = [Images.imageFiles.scenario_city_spritesheet, 0, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioBuilding2 = [Images.imageFiles.scenario_city_spritesheet, 512, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioBuilding3 = [Images.imageFiles.scenario_city_spritesheet, 1024, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioBuilding4 = [Images.imageFiles.scenario_city_spritesheet, 1536, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioBuilding5 = [Images.imageFiles.scenario_city_spritesheet, 0, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioBuilding6 = [Images.imageFiles.scenario_city_spritesheet, 512, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioBuilding7 = [Images.imageFiles.scenario_city_spritesheet, 1024, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioLamp = [Images.imageFiles.scenario_city_spritesheet, 1536, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioTree1 = [Images.imageFiles.scenario_city_spritesheet, 0, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioTree2 = [Images.imageFiles.scenario_city_spritesheet, 512, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioTree3 = [Images.imageFiles.scenario_city_spritesheet, 1024, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static cityScenarioTree4 = [Images.imageFiles.scenario_city_spritesheet, 1536, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Beach Sprites Inroad
// ---------------------------------------------------------------------------------
    static turtle1Left = [Images.imageFiles.beach_spritesheet   , 0  ,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle2Left = [Images.imageFiles.beach_spritesheet   , 128,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle3Left = [Images.imageFiles.beach_spritesheet   , 256,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle4Left = [Images.imageFiles.beach_spritesheet   , 384,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtleStopped = [Images.imageFiles.beach_spritesheet , 512,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle1Right = [Images.imageFiles.beach_spritesheet  , 0  ,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle2Right = [Images.imageFiles.beach_spritesheet  , 128,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle3Right = [Images.imageFiles.beach_spritesheet  , 256,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static turtle4Right = [Images.imageFiles.beach_spritesheet  , 384,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDogStopped = [Images.imageFiles.beach_spritesheet, 512,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog1Left = [Images.imageFiles.beach_spritesheet  , 0  ,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog2Left = [Images.imageFiles.beach_spritesheet  , 128,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog3Left = [Images.imageFiles.beach_spritesheet  , 256,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog4Left = [Images.imageFiles.beach_spritesheet  , 384,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static sandCastle = [Images.imageFiles.beach_spritesheet         , 512,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog1Right = [Images.imageFiles.beach_spritesheet , 0  ,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog2Right = [Images.imageFiles.beach_spritesheet , 128,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog3Right = [Images.imageFiles.beach_spritesheet , 256,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beachDog4Right = [Images.imageFiles.beach_spritesheet , 384,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static iceCreamCart = [Images.imageFiles.beach_spritesheet         , 512,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beetle1 = [Images.imageFiles.beach_spritesheet        , 0  ,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beetle2 = [Images.imageFiles.beach_spritesheet        , 128,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beetle3 = [Images.imageFiles.beach_spritesheet        , 256,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beetle4 = [Images.imageFiles.beach_spritesheet        , 384,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static beetle5 = [Images.imageFiles.beach_spritesheet        , 512,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Beach Side Road Sprites
// ---------------------------------------------------------------------------------
    static beachScenarioBar = [Images.imageFiles.scenario_beach_spritesheet, 0, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioBoards1 = [Images.imageFiles.scenario_beach_spritesheet, 512, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioBoards2 = [Images.imageFiles.scenario_beach_spritesheet, 1024, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioCoral = [Images.imageFiles.scenario_beach_spritesheet, 1536, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioParasol1 = [Images.imageFiles.scenario_beach_spritesheet, 0, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioParasol2 = [Images.imageFiles.scenario_beach_spritesheet, 512, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioRock1 = [Images.imageFiles.scenario_beach_spritesheet, 1024, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioRock2 = [Images.imageFiles.scenario_beach_spritesheet, 1536, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioTree1 = [Images.imageFiles.scenario_beach_spritesheet, 0, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioTree2 = [Images.imageFiles.scenario_beach_spritesheet, 512, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioTree3 = [Images.imageFiles.scenario_beach_spritesheet, 1024, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static beachScenarioTree4 = [Images.imageFiles.scenario_beach_spritesheet, 1536, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Suburb Sprites Inroad
// ---------------------------------------------------------------------------------
    static suburbDog1Left = [Images.imageFiles.suburb_spritesheet   , 0  ,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog2Left = [Images.imageFiles.suburb_spritesheet   , 128,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog3Left = [Images.imageFiles.suburb_spritesheet   , 256,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog4Left = [Images.imageFiles.suburb_spritesheet   , 384,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDogStopped = [Images.imageFiles.suburb_spritesheet , 512,    0, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog1Right = [Images.imageFiles.suburb_spritesheet  , 0  ,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog2Right = [Images.imageFiles.suburb_spritesheet  , 128,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog3Right = [Images.imageFiles.suburb_spritesheet  , 256,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static suburbDog4Right = [Images.imageFiles.suburb_spritesheet  , 384,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static catStopped = [Images.imageFiles.suburb_spritesheet, 512,  128, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat1Left = [Images.imageFiles.suburb_spritesheet  , 0  ,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat2Left = [Images.imageFiles.suburb_spritesheet  , 128,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat3Left = [Images.imageFiles.suburb_spritesheet  , 256,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat4Left = [Images.imageFiles.suburb_spritesheet  , 384,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static stairs = [Images.imageFiles.suburb_spritesheet         , 512,  256, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat1Right = [Images.imageFiles.suburb_spritesheet , 0  ,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat2Right = [Images.imageFiles.suburb_spritesheet , 128,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat3Right = [Images.imageFiles.suburb_spritesheet , 256,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static cat4Right = [Images.imageFiles.suburb_spritesheet , 384,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static hotDogCart = [Images.imageFiles.suburb_spritesheet         , 512,  384, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static motorcycle1 = [Images.imageFiles.suburb_spritesheet        , 0  ,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static motorcycle2 = [Images.imageFiles.suburb_spritesheet        , 128,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static motorcycle3 = [Images.imageFiles.suburb_spritesheet        , 256,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static motorcycle4 = [Images.imageFiles.suburb_spritesheet        , 384,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]
    static motorcycle5 = [Images.imageFiles.suburb_spritesheet        , 512,  512, Images.SPRITE_SIZE, Images.SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Suburb Side Road Sprites
// ---------------------------------------------------------------------------------
    static subScenarioBuilding1 = [Images.imageFiles.scenario_sub_spritesheet, 0, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBuilding2 = [Images.imageFiles.scenario_sub_spritesheet, 512, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBuilding3 = [Images.imageFiles.scenario_sub_spritesheet, 1024, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBuilding4 = [Images.imageFiles.scenario_sub_spritesheet, 1536, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBuilding5 = [Images.imageFiles.scenario_sub_spritesheet, 0, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBuilding6 = [Images.imageFiles.scenario_sub_spritesheet, 512, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBuilding7 = [Images.imageFiles.scenario_sub_spritesheet, 1024, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioRock = [Images.imageFiles.scenario_sub_spritesheet, 1536, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioBush = [Images.imageFiles.scenario_sub_spritesheet, 0, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioTree1 = [Images.imageFiles.scenario_sub_spritesheet, 512, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioTree2 = [Images.imageFiles.scenario_sub_spritesheet, 1024, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static subScenarioTree3 = [Images.imageFiles.scenario_sub_spritesheet, 1536, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]

// ---------------------------------------------------------------------------------
// Common Side Road Sprites
// ---------------------------------------------------------------------------------
    static commonScenarioBillboardFiap = [Images.imageFiles.scenario_common_spritesheet, 0, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioBillboardTuring = [Images.imageFiles.scenario_common_spritesheet, 512, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioBillboardVacina = [Images.imageFiles.scenario_common_spritesheet, 1024, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioBillboardRosaAzul = [Images.imageFiles.scenario_common_spritesheet, 2048, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioAnimalCrossingSign = [Images.imageFiles.scenario_common_spritesheet, 1536, 0, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioCityLeft = [Images.imageFiles.scenario_common_spritesheet, 0, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioFarmLeft = [Images.imageFiles.scenario_common_spritesheet, 512, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioBeachLeft = [Images.imageFiles.scenario_common_spritesheet, 1024, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioForestLeft = [Images.imageFiles.scenario_common_spritesheet, 1536, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioSuburbLeft = [Images.imageFiles.scenario_common_spritesheet, 2048, 512, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioCityRight = [Images.imageFiles.scenario_common_spritesheet, 0, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioFarmRight = [Images.imageFiles.scenario_common_spritesheet, 512, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioBeachRight = [Images.imageFiles.scenario_common_spritesheet, 1024, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioForestRight= [Images.imageFiles.scenario_common_spritesheet, 1536, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioSuburbRight = [Images.imageFiles.scenario_common_spritesheet, 2048, 1024, Images.LARGE_SPRITE_SIZE, Images.LARGE_SPRITE_SIZE]
    static commonScenarioCityTunnel = [Images.imageFiles.scenario_tunnel_spritesheet, 0, 0, 1280, 640]
    static commonScenarioGrassTunnel= [Images.imageFiles.scenario_tunnel_spritesheet, 0, 640, 1280, 640]

// ---------------------------------------------------------------------------------
// GUI Sprites
// ---------------------------------------------------------------------------------
    static UIStar = [Images.imageFiles.GUI_Spritesheet, 0, 0, 180, 100]
    static UIScore = [Images.imageFiles.GUI_Spritesheet, 180, 0, 180, 100]
    static UIFuel = [Images.imageFiles.GUI_Spritesheet, 0, 100, 360, 100]
    static UIRedFuel = [Images.imageFiles.GUI_Spritesheet, 360, 0, 65, 70]
    static UIJumpButton = [Images.imageFiles.GUI_Spritesheet, 150, 200, 150, 150]
    static UILeftButton = [Images.imageFiles.GUI_Spritesheet, 0, 200, 150, 150]
    static UIRightButton = [Images.imageFiles.GUI_Spritesheet, 300, 200, 150, 150]
    static UIPauseButton = [Images.imageFiles.GUI_Spritesheet, 360, 80, 100, 100]

// ---------------------------------------------------------------------------------
// Menu Sprites
// ---------------------------------------------------------------------------------
    static UIGameOver = [Images.imageFiles.menu_spritesheet, 0, 0, 700, 300]
    static UIPause = [Images.imageFiles.menu_spritesheet, 0, 300, 700, 400]
    static UIMusic = [Images.imageFiles.menu_spritesheet, 700, 0, 100, 100]
    static UIControl = [Images.imageFiles.menu_spritesheet, 800, 0, 100, 100]
    static UISound = [Images.imageFiles.menu_spritesheet, 700, 100, 100, 100]
    static UI3d = [Images.imageFiles.menu_spritesheet, 800, 100, 100, 100]
    static UISelectorOff = [Images.imageFiles.menu_spritesheet, 900, 0, 100, 100]
    static UISelectorOn = [Images.imageFiles.menu_spritesheet, 900, 100, 100, 100]
    static UIResume = [Images.imageFiles.menu_spritesheet, 700, 200, 200, 200]
    static UIReturn = [Images.imageFiles.menu_spritesheet, 700, 400, 200, 200]
    static UIHomeOff = [Images.imageFiles.menu_spritesheet, 900, 200, 100, 100]
    static UIHomeOn = [Images.imageFiles.menu_spritesheet, 900, 300, 100, 100]
    static UIConfigOff = [Images.imageFiles.menu_spritesheet, 900, 400, 100, 100]
    static UIConfigOn = [Images.imageFiles.menu_spritesheet, 900, 500, 100, 100]
    static UIReturnOff = [Images.imageFiles.menu_spritesheet, 700, 600, 100, 100]
    static UIReturnOn = [Images.imageFiles.menu_spritesheet, 800, 600, 100, 100]
    static UIConfig = [Images.imageFiles.menu_spritesheet, 0, 700, 700, 600]
    static UIRes = [Images.imageFiles.menu_spritesheet, 900, 600, 100, 100]
    static UIPlusOff = [Images.imageFiles.menu_spritesheet, 800, 700, 100, 100]
    static UIPlusOn = [Images.imageFiles.menu_spritesheet, 800, 800, 100, 100]
    static UIMinusOff = [Images.imageFiles.menu_spritesheet, 700, 700, 100, 100]
    static UIMinusOn = [Images.imageFiles.menu_spritesheet, 700, 800, 100, 100]
    static UIBarSelector = [Images.imageFiles.menu_spritesheet, 900, 700, 100, 100]
    static UIRedBar = [Images.imageFiles.menu_spritesheet, 700, 900, 300, 100]
    static UIGreenBar = [Images.imageFiles.menu_spritesheet, 700, 1000, 300, 100]
    static UIWhiteBar = [Images.imageFiles.menu_spritesheet, 700, 1100, 300, 100]
    static UIScale = [Images.imageFiles.menu_spritesheet, 700, 1200, 300, 100]

// ---------------------------------------------------------------------------------
// PowerUp Icons Sprites
// ---------------------------------------------------------------------------------
    static boltIcon0 = [Images.imageFiles.power_ups_icons_spritesheet, 0, 0, 100, 100]
    static boltIcon1 = [Images.imageFiles.power_ups_icons_spritesheet, 100, 0, 100, 100]
    static boltIcon2 = [Images.imageFiles.power_ups_icons_spritesheet, 200, 0, 100, 100]
    static boltIcon3 = [Images.imageFiles.power_ups_icons_spritesheet, 300, 0, 100, 100]
    static boltIcon4 = [Images.imageFiles.power_ups_icons_spritesheet, 400, 0, 100, 100]
    static boltIcon5 = [Images.imageFiles.power_ups_icons_spritesheet, 500, 0, 100, 100]
    static boltIcon6 = [Images.imageFiles.power_ups_icons_spritesheet, 600, 0, 100, 100]
    static boltIcon7 = [Images.imageFiles.power_ups_icons_spritesheet, 700, 0, 100, 100]
    static boltIcon8 = [Images.imageFiles.power_ups_icons_spritesheet, 800, 0, 100, 100]
    static boltIcon9 = [Images.imageFiles.power_ups_icons_spritesheet, 900, 0, 100, 100]
    static doubleIcon0 = [Images.imageFiles.power_ups_icons_spritesheet, 0, 100, 100, 100]
    static doubleIcon1 = [Images.imageFiles.power_ups_icons_spritesheet, 100, 100, 100, 100]
    static doubleIcon2 = [Images.imageFiles.power_ups_icons_spritesheet, 200, 100, 100, 100]
    static doubleIcon3 = [Images.imageFiles.power_ups_icons_spritesheet, 300, 100, 100, 100]
    static doubleIcon4 = [Images.imageFiles.power_ups_icons_spritesheet, 400, 100, 100, 100]
    static doubleIcon5 = [Images.imageFiles.power_ups_icons_spritesheet, 500, 100, 100, 100]
    static doubleIcon6 = [Images.imageFiles.power_ups_icons_spritesheet, 600, 100, 100, 100]
    static doubleIcon7 = [Images.imageFiles.power_ups_icons_spritesheet, 700, 100, 100, 100]
    static doubleIcon8 = [Images.imageFiles.power_ups_icons_spritesheet, 800, 100, 100, 100]
    static doubleIcon9 = [Images.imageFiles.power_ups_icons_spritesheet, 900, 100, 100, 100]
    static shieldIcon0 = [Images.imageFiles.power_ups_icons_spritesheet, 0, 200, 100, 100]
    static shieldIcon1 = [Images.imageFiles.power_ups_icons_spritesheet, 100, 200, 100, 100]
    static shieldIcon2 = [Images.imageFiles.power_ups_icons_spritesheet, 200, 200, 100, 100]
    static shieldIcon3 = [Images.imageFiles.power_ups_icons_spritesheet, 300, 200, 100, 100]
    static shieldIcon4 = [Images.imageFiles.power_ups_icons_spritesheet, 400, 200, 100, 100]
    static shieldIcon5 = [Images.imageFiles.power_ups_icons_spritesheet, 500, 200, 100, 100]
    static shieldIcon6 = [Images.imageFiles.power_ups_icons_spritesheet, 600, 200, 100, 100]
    static shieldIcon7 = [Images.imageFiles.power_ups_icons_spritesheet, 700, 200, 100, 100]
    static shieldIcon8 = [Images.imageFiles.power_ups_icons_spritesheet, 800, 200, 100, 100]
    static shieldIcon9 = [Images.imageFiles.power_ups_icons_spritesheet, 900, 200, 100, 100]
    static turboIcon0 = [Images.imageFiles.power_ups_icons_spritesheet, 0, 300, 100, 100]
    static turboIcon1 = [Images.imageFiles.power_ups_icons_spritesheet, 100, 300, 100, 100]
    static turboIcon2 = [Images.imageFiles.power_ups_icons_spritesheet, 200, 300, 100, 100]
    static turboIcon3 = [Images.imageFiles.power_ups_icons_spritesheet, 300, 300, 100, 100]
    static turboIcon4 = [Images.imageFiles.power_ups_icons_spritesheet, 400, 300, 100, 100]
    static turboIcon5 = [Images.imageFiles.power_ups_icons_spritesheet, 500, 300, 100, 100]
    static turboIcon6 = [Images.imageFiles.power_ups_icons_spritesheet, 600, 300, 100, 100]
    static turboIcon7 = [Images.imageFiles.power_ups_icons_spritesheet, 700, 300, 100, 100]
    static turboIcon8 = [Images.imageFiles.power_ups_icons_spritesheet, 800, 300, 100, 100]
    static turboIcon9 = [Images.imageFiles.power_ups_icons_spritesheet, 900, 300, 100, 100]

// ---------------------------------------------------------------------------------
// Changing Stage Signs Sprites
// ---------------------------------------------------------------------------------

    static turnLeftSign = [Images.imageFiles.y_road_screen_signs, 0, 0, 250, 250]
    static turnRightSign = [Images.imageFiles.y_road_screen_signs, 0, 250, 250, 250]
    static beachSign = [Images.imageFiles.y_road_screen_signs, 250, 0, 250, 60]
    static forestSign = [Images.imageFiles.y_road_screen_signs, 250, 60, 250, 60]
    static farmSign = [Images.imageFiles.y_road_screen_signs, 250, 120, 250, 60]
    static citySign = [Images.imageFiles.y_road_screen_signs, 250, 180, 250, 60]
    static suburbSign = [Images.imageFiles.y_road_screen_signs, 250, 240, 250, 60]

// ---------------------------------------------------------------------------------
// Sprites Groups
// ---------------------------------------------------------------------------------
    static greenPlayerSprites = {maxLeft: [Images.greenCarMaxSteerLeft_1, Images.greenCarMaxSteerLeft_2, Images.greenCarMaxSteerLeft_3],
        left: [Images.greenCarSteerLeft_1, Images.greenCarSteerLeft_2, Images.greenCarSteerLeft_3],
        center: [Images.greenCarCenter_1, Images.greenCarCenter_2, Images.greenCarCenter_3],
        right: [Images.greenCarSteerRight_1, Images.greenCarSteerRight_2, Images.greenCarSteerRight_3],
        maxRight: [Images.greenCarMaxSteerRight_1, Images.greenCarMaxSteerRight_2, Images.greenCarMaxSteerRight_3]}

    static pinkPlayerSprites = {maxLeft: [Images.pinkCarMaxSteerLeft_1, Images.pinkCarMaxSteerLeft_2, Images.pinkCarMaxSteerLeft_3],
        left: [Images.pinkCarSteerLeft_1, Images.pinkCarSteerLeft_2, Images.pinkCarSteerLeft_3],
        center: [Images.pinkCarCenter_1, Images.pinkCarCenter_2, Images.pinkCarCenter_3],
        right: [Images.pinkCarSteerRight_1, Images.pinkCarSteerRight_2, Images.pinkCarSteerRight_3],
        maxRight: [Images.pinkCarMaxSteerRight_1, Images.pinkCarMaxSteerRight_2, Images.pinkCarMaxSteerRight_3]}

    static bluePlayerSprites = {maxLeft: [Images.blueCarMaxSteerLeft_1, Images.blueCarMaxSteerLeft_2, Images.blueCarMaxSteerLeft_3],
        left: [Images.blueCarSteerLeft_1, Images.blueCarSteerLeft_2, Images.blueCarSteerLeft_3],
        center: [Images.blueCarCenter_1, Images.blueCarCenter_2, Images.blueCarCenter_3],
        right: [Images.blueCarSteerRight_1, Images.blueCarSteerRight_2, Images.blueCarSteerRight_3],
        maxRight: [Images.blueCarMaxSteerRight_1, Images.blueCarMaxSteerRight_2, Images.blueCarMaxSteerRight_3]}

    static subBackgrounds = [Images.imageFiles.sub_sky, Images.imageFiles.sub_bc_1, Images.imageFiles.sub_bc_2, Images.imageFiles.sub_bc_3]
    static cityBackgrounds = [Images.imageFiles.city_sky, Images.imageFiles.city_bc_1, Images.imageFiles.city_bc_2, Images.imageFiles.city_bc_3]
    static farmBackgrounds = [Images.imageFiles.farm_sky, Images.imageFiles.farm_bc_1, Images.imageFiles.farm_bc_2, Images.imageFiles.farm_bc_3]
    static forestBackgrounds = [Images.imageFiles.forest_sky, Images.imageFiles.forest_bc_1, Images.imageFiles.forest_bc_2, Images.imageFiles.forest_bc_3]
    static beachBackgrounds = [Images.imageFiles.beach_sky, Images.imageFiles.beach_bc_1, Images.imageFiles.beach_bc_2, Images.imageFiles.beach_bc_3]

    static turboIcons = [Images.turboIcon0, Images.turboIcon1,Images.turboIcon2,Images.turboIcon3,Images.turboIcon4,Images.turboIcon5,Images.turboIcon6,Images.turboIcon7,Images.turboIcon8,Images.turboIcon9]
    static boltIcons = [Images.boltIcon0, Images.boltIcon1,Images.boltIcon2,Images.boltIcon3,Images.boltIcon4,Images.boltIcon5,Images.boltIcon6,Images.boltIcon7,Images.boltIcon8,Images.boltIcon9]
    static doubleIcons = [Images.doubleIcon0, Images.doubleIcon1,Images.doubleIcon2,Images.doubleIcon3,Images.doubleIcon4,Images.doubleIcon5,Images.doubleIcon6,Images.doubleIcon7,Images.doubleIcon8,Images.doubleIcon9]
    static shieldIcons = [Images.shieldIcon0, Images.shieldIcon1,Images.shieldIcon2,Images.shieldIcon3,Images.shieldIcon4,Images.shieldIcon5,Images.shieldIcon6,Images.shieldIcon7,Images.shieldIcon8,Images.shieldIcon9]

    static racers = [Images.racerShark, Images.racerGiraffe, Images.racerBear, Images.racerPolarBear, Images.racerMonkey, Images.racerPanda1, Images.racerPanda2, Images.racerPanda3]
    static billboards = [Images.commonScenarioBillboardFiap, Images.commonScenarioBillboardTuring, Images.commonScenarioBillboardVacina, Images.commonScenarioBillboardRosaAzul]
}
