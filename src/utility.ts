export function shuffle(arr:string[])
{
    for(let i=arr.length-1;i>0;i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        //Swap
        if(arr[1] && arr[j])
        {
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp!  
        }
    }
    return arr
}