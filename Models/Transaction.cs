namespace Sbanken.Models
{
    public class Transaction
    {
        public int TransaksjonsID { get; set; }
        public int KategoriID { get; set; }
        public DateTime Dato { get; set; }
        public double Beloep { get; set; }
        public string Beskrivelse { get; set; }
    }
}