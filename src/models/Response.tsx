export interface Response {
    id: number,
    ouvir: string,
    resposta: string,
}

export function initResponse(): Response {
    return {
        id: -1,
        ouvir: '',
        resposta: ''
    }
}

export function createResponse(ouvir: string, resposta: string): Response {
    return {
        id: 0,
        ouvir,
        resposta
    }
}