if (typeof Crumbulum !== 'undefined') {
    if (Crumbulum === null) {
        delete Crumbulum;
    } else throw new Error('Crumbulum already loaded.');
}
var Crumbulum = {
    OG: {}, // Original Game Data
    Game: { // Our overrides
        UpdateMenu: () => {
            Crumbulum.OG.UpdateMenu();
            if (Game.onMenu == 'prefs') {
                let fragment = document.createDocumentFragment();
                fragment.appendChild(Crumbulum.Menu.heading('Crumbulum Options'));
                // Toggles
                let toggleSection = Crumbulum.Menu.section('toggles','Toggles');
                toggleSection.appendChild(Crumbulum.Menu.toggleButton('toggles','autoClicker','Auto Click Big Cookie','Clicks the big cookie for you.'));
                toggleSection.appendChild(Crumbulum.Menu.toggleButton('toggles','autoGolden','Auto Click Golden Cookies','Clicks any golden cookies for you.'));
                toggleSection.appendChild(Crumbulum.Menu.toggleButton('toggles','autoReindeer','Auto Click Reindeer','Clicks on reindeer for you'));
                toggleSection.appendChild(Crumbulum.Menu.toggleButton('toggles','autoNews','Auto Click News','Clicks on the news ticker for you.'));
                fragment.appendChild(toggleSection);
                fragment.appendChild(Crumbulum.Menu.subheading('Auto Clickers'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','autoClicker','Auto Click Big Cookie','Clicks the big cookie for you.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','autoGolden','Auto Click Golden Cookies','Clicks any golden cookies for you.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','autoReindeer','Auto Click Reindeer','Clicks on reindeer for you'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','autoNews','Auto Click News','Clicks on the news ticker for you.'));
                fragment.appendChild(Crumbulum.Menu.subheading('Golden Cookies'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','blockWrath','Block Wrath Cookies','Prevents wrath cookies from spawning.'));
                fragment.appendChild(Crumbulum.Menu.subheading('Infinite Stuff'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','infiniteCookies','Infinite Cookies','Causes your cookies to constantly regenerate.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','infiniteMagic','Infinite Magic','Causes your Grimoire magic to recharge almost instantly'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','infiniteSwaps','Infinite Swaps','Causes your Pantheon swaps to regenerate almost instantly.'));
                fragment.appendChild(Crumbulum.Menu.subheading('Mini-game Enhancers'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','miracleSpells','Miracle Spell™','Grimoire spells will never fail.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','immortalPlants','Make Plants Immortal','Makes it so plants never wither. Does not affect weeds or fungi.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','neverWeeds','Never Weed™','Makes it so weeds never spawn on their own. You can still plant them and they still may spread.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','allGodsActive','Pantheon \'R Us','All Pantheon gods except for Cyclius will be active in slot one.'));
                fragment.appendChild(Crumbulum.Menu.toggleButton('1','allGodsSlotOne','Power Of The Gods','All Pantheon gods will behave as if they are in slot 1 regardless of which slot they are in.'));
                fragment.appendChild(Crumbulum.Menu.heading('Crumbulum Actions'));
                fragment.appendChild(Crumbulum.Menu.subheading('Normal Spawning'));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','spawnGolden','Spawn a Golden Cookie','Spawns a golden cookie, no type specified.', Crumbulum.Actions.spawnGolden));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','spawnGoldenFrenzy','Spawn a Frenzy Cookie','Spawns a frenzy golden cookie.', Crumbulum.Actions.spawnGoldenFrenzy));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','spawnGoldenDragonflight','Spawn a Dragonflight Cookie','Spawns a dragonflight golden cookie.', Crumbulum.Actions.spawnGoldenDragonflight));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','giveSugarLump','Give Sugar Lump','Gives you a sugar limp.', Crumbulum.Actions.giveSugarLump));
                fragment.appendChild(Crumbulum.Menu.subheading('Seasonal Spawning (The respective season must be active)'));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','spawnReindeer','Spawn a reindeer','Christmas: Spawns a reindeer.', Crumbulum.Actions.spawnReindeer));
                fragment.appendChild(Crumbulum.Menu.subheading('Mini-games'));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','refillMagic','Refill Magic','Refill all of your Grimoire\'s magic.', Crumbulum.Actions.refillMagic));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','refillSwaps','Refill Swaps','Refill all of your Pantheon\'s swaps', Crumbulum.Actions.refillSwaps));
                fragment.appendChild(Crumbulum.Menu.subheading('Unlock Things'));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','unlockAllSeeds','Unlock Plant Seeds','Unlocks all the plant seeds for your Garden. Does not unlock weeds or fungi.', Crumbulum.Actions.unlockAllSeeds));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','unlockAllWeedFungusSeeds','Unlock Weed and Fungi Seeds','Unlocks all the weed and fungus seeds for the Garden.', Crumbulum.Actions.unlockAllWeedFungusSeeds));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','lockAllSeeds','Lock All Seeds','Locks all the seeds for the Garden except for the starting seed.', Crumbulum.Actions.lockAllSeeds));
                fragment.appendChild(Crumbulum.Menu.subheading('Misc'));
                fragment.appendChild(Crumbulum.Menu.actionButton('1','removeCheatedCookies','Remove Cheat Achievement','Remove \'Cheated cookies taste awful\' achievement', Crumbulum.Actions.removeCheatedCookies));

                // Unload Crumbulum button. Doesn't work if you loaded other add-ons first. We check only for Cookie Monster.
                if (typeof CM === 'undefined' || Crumbulum.cookieMonsterLoaded) fragment.appendChild(Crumbulum.Menu.actionButton('unloadCrumbulum','Unload Crumbulum','Unloads Crumbulum and disabled all of it\'s features.', Crumbulum.Actions.unloadCrumbulum));

                Crumbulum.PluginHooks.UpdateMenu(fragment);
        
                l('menu').childNodes[2].insertBefore(fragment, l('menu').childNodes[2].childNodes[l('menu').childNodes[2].childNodes.length - 1]);
            }
        },
    },
    Actions: { // Our action library
        spawnGolden: () => {
            Game.shimmerTypes.golden.time = Game.shimmerTypes.golden.maxTime;
        },
        spawnGoldenFrenzy: ()=>Crumbulum.Actions.spawnGoldenFixed('frenzy'),
        spawnGoldenDragonflight: ()=>Crumbulum.Actions.spawnGoldenFixed('dragonflight'),
        spawnGoldenFixed: (type) => {
            let newShimmer = new Game.shimmer('golden',{noWrath:true});
            newShimmer.dur = 10000;
            newShimmer.life = Math.ceil(Game.fps*newShimmer.dur);
            newShimmer.force = type;
            newShimmer.sizeMult = 2;
            return newShimmer;
        },
        spawnReindeer: () => {
            Game.shimmerTypes.reindeer.time = Game.shimmerTypes.reindeer.maxTime;
        },
        removeCheatedCookies: ()=>Game.RemoveAchiev('Cheated cookies taste awful'),
        refillMagic: ()=>{
            if (Game.Objects['Wizard tower'].minigameLoaded && Game.Objects['Wizard tower'].minigame.magicM)
                Game.Objects['Wizard tower'].minigame.magic = Game.Objects['Wizard tower'].minigame.magicM;
        },
        refillSwaps: ()=>{
            if (Game.Objects['Temple'].minigameLoaded && Game.Objects['Temple'].minigame.gods) {
                Game.Objects['Temple'].minigame.swaps=3;
                Game.Objects['Temple'].minigame.swapT=Date.now();
                Game.Objects['Temple'].minigame.lastSwapT=0;
            }
        },
        giveSugarLump: ()=>{
            Game.gainLumps(1);
        },
        giveCookies: ()=>{
            Game.cookies = Game.cookiesEarned;
        },
        unlockAllSeeds: ()=>{
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants) {
                Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (plant.unlocked) return;
                    if (plant.weed || plant.fungus) return;
                    Game.Objects['Farm'].minigame.unlockSeed(plant);
                });
            }
        },
        unlockAllWeedFungusSeeds: ()=>{
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants) {
                Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (plant.unlocked) return;
                    if (!plant.weed && !plant.fungus) return;
                    Game.Objects['Farm'].minigame.unlockSeed(plant);
                });
            }
        },
        lockAllSeeds: ()=>{
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants) {
                Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (plant.unlocked) Game.Objects['Farm'].minigame.lockSeed(plant);
                });
                Game.Objects['Farm'].minigame.unlockSeed(Game.Objects['Farm'].minigame.plants['bakerWheat']);
            }
        },
        unloadCrumbulum: ()=>{
            Object.keys(Crumbulum.ticks).forEach((tickThis) => {
                let tick = Crumbulum.ticks[tickThis];
                if (tick.intervalId) {
                    clearInterval(tick.intervalId);
                    tick.intervalId = 0;
                }
            });
            Crumbulum.Liberate.Game();
            Crumbulum.PluginHooks.UnloadPlugins();
            Game.UpdateMenu();
            setTimeout(() => Crumbulum = null, 100);
        },
    },
    ConfigDefaults: { // The default value for the configs
        'toggles': false,
        'autoClicker': false,
        'autoGolden': false,
        'autoReindeer': false,
        'autoNews': false,
        'infiniteCookies': false,
        'infiniteMagic': false,
        'infiniteSwaps': false,
        'blockWrath': false,
        'immortalPlants': false,
        'neverWeeds': false,
        'miracleSpells': false,
        'allGodsActive': false,
        'allGodsSlotOne': false,
    },
    Config: {}, // User settings
    Init: () => { // Initialize the add-on.
        if (!Game || !Game.version || !Game.updateLog) {
            alert('The game isn\'t loaded yet or this isn\'t the game.');
            return;
        }
        Crumbulum.Hijack.Game();
        Crumbulum.loadConfig();
        Crumbulum.initTicks();
        Game.Win('Third-party');
        if (typeof CM === 'object' && typeof Queue !== 'undefined' && typeof jscolor !== 'undefined') Crumbulum.cookieMonsterLoaded = true;
        Crumbulum.PluginHooks.Init();
    },
    cookieMonsterLoaded: false,
    Menu: {
        section: (configParam, text) => {
            let div = document.createElement('div'), a = document.createElement('a');
            if (!Crumbulum.getConfig(configParam)) a.className = 'option off';
            else a.className = 'option';
            a.id = `Crumbulum-${configParam}`;
            a.onclick = ()=>Crumbulum.toggleSection(configParam);
            a.textContent = text;
            div.appendChild(a);
            return div;
        },
        toggleButton: (section, configParam, text, description) => {
            let div = document.createElement('div'), a = document.createElement('a'), label = document.createElement('label');
            if (!Crumbulum.getConfig(configParam)) a.className = 'option off';
            else a.className = 'option';
            a.id = `Crumbulum-${configParam}`;
            a.tagName =  `Crumbulum-${section}`;
            a.onclick = ()=>Crumbulum.toggleConfig(configParam);
            a.textContent = text;
            label.textContent = description;
            div.className = 'listing';
            div.appendChild(a);
            div.appendChild(label);
            return div;
        },
        actionButton: (section, configParam, text, description, action) => {
            let div = document.createElement('div'), a = document.createElement('a'), label = document.createElement('label');
            a.className = 'option';
            a.id = `Crumbulum-${configParam}`;
            a.tagName =  `Crumbulum-${section}`;
            a.onclick = action;
            a.textContent = text;
            label.textContent = description;
            div.className = 'listing';
            div.appendChild(a);
            div.appendChild(label);
            return div;
        },
        heading: (text) => {
            let heading = document.createElement('div');
            heading.className = 'title';
            heading.textContent = text;
            return heading;
        },
        subheading: (text) => {
            let subheading = Crumbulum.Menu.heading(text);
            subheading.style.fontSize = '17px';
            return subheading;
        },
    },
    saveConfig: () => {
        localStorage.setItem('Crumbulum', JSON.stringify(Crumbulum.Config));
    },
    loadConfig: () => {
        let config = localStorage.getItem('Crumbulum');
        if (config) {
            config = JSON.parse(config);
            Object.keys(config).forEach((key) => {
                Crumbulum.setConfig(key, config[key]);
            });
        }
    },
    getConfig: (configParam) => {
        if (typeof Crumbulum.Config[configParam] === 'undefined')
            return Crumbulum.ConfigDefaults[configParam];
        else return Crumbulum.Config[configParam];
    },
    setConfig: (configParam, configValue) => {
        if (configValue === Crumbulum.ConfigDefaults[configParam])
            delete Crumbulum.Config[configParam];
        else Crumbulum.Config[configParam] = configValue;
        Crumbulum.saveConfig();
        return Crumbulum.getConfig(configParam);
    },
    toggleConfig: (configParam) => {
        let val = Crumbulum.setConfig(configParam, !Crumbulum.getConfig(configParam));
        Crumbulum.updateMenuView(configParam);
        return val;
    },
    toggleSection: (configParam) => {
        let elements = document.getElementsByTagName(`Crumbulum-${configParam}`);
        for(let item of elements) {
            if (item.style.display == "block") {
                item.style.display == "none";
            } else {
                item.style.display == "block";
            }
        }
        return element;
    },
    updateMenuView: (configParam) => {
        if (!Crumbulum.getConfig(configParam))
            l(`Crumbulum-${configParam}`).className = 'option off';
        else
            l(`Crumbulum-${configParam}`).className = 'option';
    },
    Liberate: {
        Game: () => {
            if (Crumbulum.OG.UpdateMenu) Game.UpdateMenu = Crumbulum.OG.UpdateMenu;
            if (Crumbulum.OG.shimmerPrototypeInit) Game.shimmer.prototype.init = function() {
                Game.shimmerTypes[this.type].initFunc(this);
            };
            //if (Game.hasGod) Crumbulum.Liberate.hasGod();
            Crumbulum.Liberate.miniGames();
        },
        miniGames: () => {
            if(Game.Objects['Farm'].minigameLoaded && Game.Objects['Farm'].minigame.plants && Game.Objects['Farm'].minigame.soils) {
                if (Crumbulum.OG.gardenPlantsMortality) Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                    let plant = Game.Objects['Farm'].minigame.plants[plantName];
                    if (!plant.weed && !plant.fungus) Object.defineProperty(plant, 'immortal', {value:Crumbulum.OG.gardenPlantsMortality[plantName],configurable: true});
                });
        
                if (Crumbulum.OG.gardenSoilWeed) Object.keys(Game.Objects['Farm'].minigame.soils).forEach((soilName) => {
                    let soil = Game.Objects['Farm'].minigame.soils[soilName];
                    Object.defineProperty(soil, 'weedMult', {value:Crumbulum.OG.gardenSoilWeed[soilName],configurable: true});
                });
            }
            if(Game.Objects['Wizard tower'].minigameLoaded && Game.Objects['Wizard tower'].minigame.getFailChance) {
                if (Crumbulum.OG.grimoireFailChance) Game.Objects['Wizard tower'].minigame.getFailChance = Crumbulum.OG.grimoireFailChance;
            }
        },
        //hasGod: () => {
        //    if(Game.Objects['Temple'].minigameLoaded && Game.Objects['Temple'].minigame.gods && Crumbulum.OG.hasGod && Game.hasGod) Game.hasGod = Crumbulum.OG.hasGod;
        //    else delete Game.hasGod;
        //},
    },
    Hijack: {
        Game: () => {
            if (!Crumbulum.OG.UpdateMenu) {
                Crumbulum.OG.UpdateMenu = Game.UpdateMenu;
                Game.UpdateMenu = Crumbulum.Game.UpdateMenu;
            }
            if (!Crumbulum.OG.shimmerPrototypeInit) {
                Crumbulum.OG.shimmerPrototypeInit = true;
                Game.shimmer.prototype.init = function() {
                    if (Crumbulum.getConfig('blockWrath')) {
                        this.forceObj = {'noWrath':true};
                        Game.shimmerTypes[this.type].initFunc(this);
                    } else {
                        Game.shimmerTypes[this.type].initFunc(this);
                    }
                }
            }
            //if (!Crumbulum.OG.hasGod) Crumbulum.Hijack.hasGod();
        
            Crumbulum.Hijack.miniGames();
        },
        miniGames: () => {
            if (!Crumbulum) return;
            retry = false;
        
            if(!Game.Objects['Farm'].minigameLoaded || !Game.Objects['Farm'].minigame.plants || !Game.Objects['Farm'].minigame.soils) {
                retry = true;
            } else {
                if (!Crumbulum.OG.gardenPlantsMortality) {
                    Crumbulum.OG.gardenPlantsMortality = {};
                    Object.keys(Game.Objects['Farm'].minigame.plants).forEach((plantName) => {
                        let plant = Game.Objects['Farm'].minigame.plants[plantName];
                        if (!plant.weed && !plant.fungus) {
                            Crumbulum.OG.gardenPlantsMortality[plantName] = plant.immortal;
                            Object.defineProperty(plant, 'immortal', {get:()=>{return (Crumbulum.getConfig('immortalPlants')?true:Crumbulum.OG.gardenPlantsMortality[plantName])},configurable: true});
                        }
                    });
                }
        
                if (!Crumbulum.OG.gardenSoilWeed) {
                    Crumbulum.OG.gardenSoilWeed = {};
                    Object.keys(Game.Objects['Farm'].minigame.soils).forEach((soilName) => {
                        let soil = Game.Objects['Farm'].minigame.soils[soilName];
                        Crumbulum.OG.gardenSoilWeed[soilName] = soil.weedMult;
                        Object.defineProperty(soil, 'weedMult',{get:()=>{return (Crumbulum.getConfig('neverWeeds')?0:Crumbulum.OG.gardenSoilWeed[soilName])},configurable: true});
                    });
                }
            }
        
            if(!Game.Objects['Wizard tower'].minigameLoaded || !Game.Objects['Wizard tower'].minigame.getFailChance) {
                retry = true;
            } else {
                if (!Crumbulum.OG.grimoireFailChance) {
                    Crumbulum.OG.grimoireFailChance = Game.Objects['Wizard tower'].minigame.getFailChance;
                    Game.Objects['Wizard tower'].minigame.getFailChance = (spell)=>(Crumbulum.getConfig('miracleSpells')?0:Crumbulum.OG.grimoireFailChance(spell));
                }
            }
        
            if (retry) setTimeout(Crumbulum.Hijack.miniGames, 1000);
        },
        hasGod: () => {
            if (!Crumbulum) return;
            if(!Game.Objects['Temple'].minigameLoaded || !Game.Objects['Temple'].minigame.gods) {
                setTimeout(Crumbulum.Hijack.hasGod, 1000); // We keep running this until we get the real Game.hasGod()
            } else if (!Crumbulum.OG.hasGod && Game.hasGod) {
                Crumbulum.OG.hasGod = Game.hasGod;
            }
            Game.hasGod = function(what) {
                if (Crumbulum.getConfig('allGodsActive')) {
                    if (['ages'].includes(what)) return false; // Add gods to this if you want to skip them
                    return 1;
                } else if (Crumbulum.getConfig('allGodsSlotOne')) {
                    if(!Game.Objects['Temple'].minigameLoaded || !Game.Objects['Temple'].minigame.gods) return false; // Don't run if minigame isn't loaded (errors otherwise)
                    let god = Game.Objects['Temple'].minigame.gods[what];
                    for (let i=0;i<3;i++)
                        if (Game.Objects['Temple'].minigame.slot[i]==god.id) return 1;
                    return false;
                } else {
                    if (Crumbulum.OG.hasGod) return Crumbulum.OG.hasGod(what);
                    else return false;
                }
            }
        },
    },
    initTicks: () => {
        Object.keys(Crumbulum.ticks).forEach((tickThis) => {
            let tick = Crumbulum.ticks[tickThis];
            if (!tick.intervalId) tick.intervalId = setInterval(tick.onTick, tick.rate);
        });
    },
    ticks: {
        'autoClicker': {
            'intervalId': null,
            'rate': 50,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('autoClicker')) return;
                Game.ClickCookie();
            },
        },
        'autoGolden': {
            'intervalId': null,
            'rate': 500,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('autoGolden')) return;
                Game.shimmers.forEach(function(shimmer) {
                    if (shimmer.type == "golden") { shimmer.pop() }
                })
            },
        },
        'autoReindeer': {
            'intervalId': null,
            'rate': 500,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('autoReindeer')) return;
                Game.shimmers.forEach(function(shimmer) {
                    if (shimmer.type == 'reindeer') { shimmer.pop() }
                })
            },
        },
        'autoNews': {
            'intervalId': null,
            'rate': 3000,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('autoNews')) return;
                if (Game.TickerEffect && Game.TickerEffect.type == 'fortune') Game.tickerL.click();
            },
        },
        'infiniteCookies': {
            'intervalId': null,
            'rate': 100,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('infiniteCookies')) return;
                Game.cookies = Game.cookiesEarned;
            },
        },
        'infiniteMagic': {
            'intervalId': null,
            'rate': 1000,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('infiniteMagic')) return;
                if (Game.Objects['Wizard tower'].minigameLoaded && Game.Objects['Wizard tower'].minigame.magicM)
                    Game.Objects['Wizard tower'].minigame.magic = Game.Objects['Wizard tower'].minigame.magicM;
            },
        },
        'infiniteSwaps': {
            'intervalId': null,
            'rate': 1000,
            'onTick': ()=>{
                if (!Crumbulum.getConfig('infiniteSwaps')) return;
                if(!Game.Objects['Temple'].minigameLoaded || !Game.Objects['Temple'].minigame.gods) return;
                Game.Objects['Temple'].minigame.swaps=3;
                Game.Objects['Temple'].minigame.swapT=Date.now();
                Game.Objects['Temple'].minigame.lastSwapT=0;
            },
        },
    },
    PluginHooks: {
        Init: () => {
            Object.keys(Crumbulum.Plugins).forEach((key) => {
                let plugin = Crumbulum.Plugins[key];
                if (typeof plugin['Init'] === 'function') plugin['Init']();
            });
        },
        UnloadPlugins: () => {
            Object.keys(Crumbulum.Plugins).forEach((key) => {
                let plugin = Crumbulum.Plugins[key];
                if (typeof plugin['Unload'] === 'function') plugin['Unload']();
            });
        },
        UpdateMenu: (fragment) => {
            Object.keys(Crumbulum.Plugins).forEach((key) => {
                let plugin = Crumbulum.Plugins[key];
                if (typeof plugin['Game'] === 'object' && typeof plugin['Game']['UpdateMenu'] === 'function') plugin['Game']['UpdateMenu'](fragment);
            });
        },
    },
    Plugins: {}, // Plugins
};

// You can setup `CrumbulumPlugins` (object) with your custom plugins before loading this script
if (typeof CrumbulumPlugins === 'object') {
    Object.keys(CrumbulumPlugins).forEach((key) => {
        let plugin = CrumbulumPlugins[key];
        if (typeof plugin === 'object') {
            Crumbulum.Plugins[key] = plugin;
            if (typeof Crumbulum.Plugins[key]['Loaded'] === 'function') Crumbulum.Plugins[key].Loaded();
        } else if (typeof plugin === 'function') {
            Crumbulum.Plugins[key] = plugin;
            Crumbulum.Plugins[key]();
        }
    });
}

// Alternatively, you can set CrumbulumInit to false to prevent the Init and set up your plugins after loading the script, remember to call `Crumbulum.Init()` afterwards.
if (typeof CrumbulumInit === 'undefined' || CrumbulumInit) Crumbulum.Init();

/* cSpell:ignore Crumbulum, Toggleables, prefs, minigame, Mult, grimoire, grimoire's, grimoire\'s, Cyclius, dragonflight, Achiev, jscolor */
