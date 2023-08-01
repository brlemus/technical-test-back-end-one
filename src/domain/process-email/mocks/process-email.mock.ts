export const requestData = {
    Records: [
        {
            ses: {
                receipt: {
                    timestamp: '2015-09-11T20:32:33.936Z',
                    processingTimeMillis: 222,
                    recipients: [
                        'recipient@example.com'
                    ],
                    spamVerdict: {
                        status: 'PASS'
                    },
                    virusVerdict: {
                        status: 'PASS'
                    },
                    spfVerdict: {
                        status: 'PASS'
                    },
                    dkimVerdict: {
                        status: 'PASS'
                    },
                    dmarcVerdict: {
                        status: 'PASS'
                    },
                },
                mail: {
                    timestamp: '2015-09-11T20:32:33.936Z',
                    source: '61967230-7A45-4A9D-BEC9-87CBCF2211C9@example.com',
                    destination: [
                        'recipient@example.com'
                    ],
                }
            },
        }
    ]
}

export const responseData = {
    spam: true,
    virus: true,
    dns: true,
    mes: 'September',
    retrasado: false,
    emisor: '61967230-7A45-4A9D-BEC9-87CBCF2211C9',
    receptor: [
        'recipient'
    ]
}

export const mockJsonData = {
    key: 'value',
}

export const mockEmailData = {
    attachments: [
        {
            contentType: 'application/json',
            content: Buffer.from(JSON.stringify(mockJsonData)),
        },
    ],
}