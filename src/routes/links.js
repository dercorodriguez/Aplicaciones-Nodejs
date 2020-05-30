const express = require('express');
const sql = require('mssql');
const router = express.Router();
const dbmspool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.get('/', isLoggedIn, async(req, res) => {
    const links = await dbmspool.query('select * from links where user_id = ?', [req.user.id]);
    res.render('links/lista', { links });
});

router.post('/add', isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;
    const newlinks = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    console.log('req.user.id', req.user.id);
    await dbmspool.query('INSERT INTO LINKS SET ?', [newlinks]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await dbmspool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await dbmspool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('links/edit', { link: links[0] });
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await dbmspool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
});

module.exports = router;