import { codeType } from './codeType';

interface postCodeType {
    status: number;
    message: string;
}
export default async function PostCode(data: codeType): Promise<postCodeType> {
    data.code = `onmessage(e)=>{ ${data.code} }`;

    let returnVal:postCodeType = 
    {
        status: 0,
        message:"init"
    };
    await fetch(`${process.env.REACT_APP_base_url}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res: any) => {
            console.log('done', res);
            returnVal={
                status: res.status,
                message: 'success'
            }
        })
        .catch((err: any) => {
            console.error(err);
            returnVal={
                status: err.status,
                message: 'error'
            }
        });
    return returnVal;
}
