module.exports = {
    app: {
        token: 'MTAxNTQwNjEwNTAzNzM4MTY1Mg.GbLu_l.tkq9-R4SW_A8fr9d25-AsDHPIquLKthZkG4oPg',
        playing: 'test',
        global: true,
        guild: '776816831863586856'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
