const wordCounter = (essay: string): number => 
    essay.trim().split(/\s+/)
      .map(palavra => palavra.trim())
      .filter(palavra => palavra !== '').length;
  
export default wordCounter