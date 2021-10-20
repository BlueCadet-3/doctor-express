module.exports = {
	showIndex,
};

async function showIndex (req, res) {
	res.render('root/index', { title: "Home Page | Doctor Express" });
}

