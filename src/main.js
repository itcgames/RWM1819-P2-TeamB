var gameNs = {}

function main()
{
    const game = new Game()
    gameNs.game = game
    gameNs.game.init()
    gameNs.game.update()
}