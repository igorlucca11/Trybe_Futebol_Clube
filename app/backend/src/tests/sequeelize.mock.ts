const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();
 
const TeamsMock = dbMock.define('teams', [{
    id: 1,
    teamName: 'Vasco'
},
{
    id: 2,
    teamName: 'Santos'
},
{
    id: 3,
    teamName: 'Botafogo'
} ]);
 
TeamsMock.$queryInterface.$useHandler((query: string) => {
    if (query === 'findAll') {
            return [{
                id: 1,
                teamName: 'Vasco'
            },
            {
                id: 2,
                teamName: 'Santos'
            },
            {
                id: 3,
                teamName: 'Botafogo'
            } ];
    }
}
)

export default TeamsMock;