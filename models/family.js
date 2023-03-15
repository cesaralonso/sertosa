const Family = {};

Family.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT family.* 
             FROM family 
              
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = family.created_by ` : ""} 
             WHERE family.is_deleted = false 
                  AND family.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND family.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Family leíd@' });
    });
};

Family.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT family.* 
             FROM family 
              
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = family.created_by ` : ""} 
             WHERE family.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND family.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Family leíd@' });
    });
};

Family.findById = (idFamily, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT family.* 
             FROM family 
              
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = family.created_by ` : ""} 
             WHERE family.is_deleted = false 
                  AND idfamily = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND family.created_by = ?` : ""}`
        keys = [idFamily];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Family encontrad@' });
    });
};

Family.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idfamily) AS count FROM family`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Family contabilizad@' });
    });
};

Family.exist = (idFamily, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM family WHERE idfamily = ?) AS exist`;
    keys = [idFamily];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Family verificad@' });
    });
};

Family.insert = (Family, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO family SET ?`;
    keys = [Family];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Family cread@' });
    });
};

Family.update = (Family, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE family SET ? WHERE idfamily = ? AND created_by = ?`;
        keys = [Family, Family.idfamily, created_by];
    } else {
        query = `UPDATE family SET ? WHERE idfamily = ?`;
        keys = [Family, Family.idfamily];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Family actualizad@' });
    });
};

Family.remove = (idfamily, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM family WHERE idfamily = ? AND created_by = ?`;
        keys = [idfamily, created_by];
    } else {
        query = `DELETE FROM family WHERE idfamily = ?`;
        keys = [idfamily];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Family eliminad@' });
    });
};

Family.logicRemove = (idfamily, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE family SET is_deleted = 1 WHERE idfamily = ? AND created_by = ?`;
        keys = [idfamily, created_by];
    } else {
        query = `UPDATE family SET is_deleted = 1 WHERE idfamily = ?`;
        keys = [idfamily];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Family eliminad@' });
    });
};

Family.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Family;
