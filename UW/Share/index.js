import { Params } from "@upgradableweb/client";


export function ShareUrl(url) {
    if (navigator.share) {
        navigator.share({ url })
            .then(() => {
                console.log('Content shared successfully');
            })
            .catch(() => {
                console.log('Failed to share content:');
            });
    } else {
        alert('something went wrong! please copy the url');
    }

}


export function WhatsAppShare(text, phone) {
    const mob = /Mobi|Android/i.test(navigator.userAgent),
        share = `https://${mob ? 'api.whatsapp.com' : 'web.whatsapp.com'}/send?${Params({ text, phone })}`,
        { width, height } = screen
    window.open(share, '_blank', `width=${width * 0.5},height=${height},left=0,top=0`);
}

export function EmailShare(text, email) {
    const share = `mailto:${email}?${text}`,
        { width, height } = screen
    window.open(share, '_blank', `width=${width * 0.5},height=${height},left=0,top=0`)
}