


module.exports = (app) =>{
    resources(/^\/(index)?$/,'index');
    resources('/words','words');
    resources('/user','user');
    resources('/invitations', 'invitations');

    /**
     * 加载controller
     */
    function resources(path,resources){
        app.use(path, require(`./app/${resources}.controller.js`));
    }
}

