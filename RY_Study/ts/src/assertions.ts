const inlutElement = document.querySelector('input')
const value1 = (inlutElement as HTMLInputElement).value
const value2 = (<HTMLInputElement>inlutElement).value

const getLength = (text: string  | null ): number => {
    return text!.length
}


getLength('defgfds')
getLength(null)