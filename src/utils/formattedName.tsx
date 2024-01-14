export function formattedNameFn(name: string | null,) {
    if (!name) return null
    return name
        ?.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}