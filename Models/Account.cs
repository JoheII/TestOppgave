namespace Sbanken.Models
{
    public class Account
    {
        public string Kontonavn { get; set; }
        
        public double Saldo { get; set; }
        public List<Transaction> Transaksjoner { get; set; }
    }
}