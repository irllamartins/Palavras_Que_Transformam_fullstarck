const wordCounter = (essay: string | undefined): number =>
    ((essay || "").split(" ").map(palavra => palavra.trim())
        .filter(palavra => palavra !== '') || []).length

export default wordCounter