const express = require('express')
const app = express();
const ejs = require('ejs');
const fs = require('node:fs')

app.use(express.static('public'));
app.listen(3000, async () => console.log(`HTML Online`))
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

process.on('unhandledRejection', error => { console.error(error) });
process.on('uncaughtException', error => { console.error(error) });

app.get('/2023_03_15/:file', async (req, res) => {
    try {
        const file = await fs.readFileSync(`./view/2023_03_15/${req.params.file}`, { encoding: 'utf-8' })
        if (!file) return await res.send(`파일이 없는거 같은데요?`)
        await res.send(file)
    } catch (err) {
        res.send(`파일 불러오기 실패!`)
    }
})