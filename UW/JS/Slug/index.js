export default function Slug(str = '') {
    return str.split(' ').map(d => d.trim().replaceAll(/[^a-zA-Z0-9]/g, '')).filter(d=>d).join('-').toLowerCase();
}
