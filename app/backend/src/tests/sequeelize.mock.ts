import { QueryTypes } from "sequelize";

const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const dataBase = [{
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
} ]
 
const TeamsMock = dbMock.define('teams');
 
TeamsMock.$queryInterface.$useHandler((query: string, queryOptions: QueryTypes) => {
    if (query === 'findAll') {
            return dataBase;
    }
    if (query === 'findById') {
        const result = dataBase.find((team) => team.id === Number(queryOptions[0]))
        return result;
    }
}
)

export default TeamsMock;

export { dataBase }