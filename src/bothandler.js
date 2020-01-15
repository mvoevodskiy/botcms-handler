const BotCMS = require('botcms');
const MVTools = require('mvtools');


/**
 * @class BotCMSHandler
 *
 * @property {Object} config
 *
 * @property {MvLoader} App
 * @property {BotCMS} Bot
 * @property {MVTools} MT
 *
 */
class BotCMSHandler {
    static exportConfig = {};
    config = {};
    defaults = {
        botcms: {
            db: {
                name: 'botcms',
            }
        }
    };

    constructor(App, config = {}) {
        this.MT = new MVTools;
        this.App = App;
        this.loadConfig(config);
        // console.log('BOTCMS HANDLER CONSTRUCTOR. CONFIG: ', this.config);
    }

    async init () {
        // console.log('BOTCMS HANDLER INIT');
        return Promise.resolve()
            .then(() => {
                let config = this.config.botcms || {};
                // config.db = this.MT.mergeRecursive(this.App.config.db, config.db);
                this.Bot = new BotCMS(config);
            })
            .then(() => this.loadSchema(this.config.schemaFiles)
            .then(() => this.Bot.init())
            .then(async () => await this.Bot.launch()));
            // .then(() => this.Bot.loadSchema('./overload.yml'))
            // .then(() => console.log(this.Bot.Scripts.extract('c')))
            // .then(() => this.TG = this.Bot.bridges.tg);
    }

    async loadConfig (config) {
        this.config = this.MT.mergeRecursive(this.defaults, this.config, config);
    }

    async loadSchema (schemas) {
        // console.log('BOT HANDLER. LOAD SCHEMA. SCHEMAS: ', schemas);
        if (Array.isArray(schemas)) {
            for (let schema of schemas) {
                // console.log('BOT HANDLER. LOAD SCHEMA. SCHEMA: ', schema);
                await this.Bot.loadSchema(schema);
            }
        } else {
            await this.Bot.loadSchema(schemas);
        }
    }

}

module.exports = BotCMSHandler;