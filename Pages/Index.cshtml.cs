using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Sbanken.Models;

namespace Sbanken.Pages;

public class IndexModel : PageModel
{

    private readonly ILogger<IndexModel> _logger;

    // Pascal (get; set;)  //
    public Account Account { get; set; }
    public List<Category> Categories { get; set; }
    public IEnumerable<int> BigTransactions { get; set; }
    public double SumIn { get; set; }
    public double SumOut { get; set; }

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;

    }


    public async Task OnGetAsync(int sort)
    {
        Account = await FetchAccount();

        Categories = await FetchCategory();



        SumOut =
            (from a in Account.Transaksjoner
            where a.Beloep < 0
            select a.Beloep).Sum();

        SumIn =  
            (from a in Account.Transaksjoner
            where a.Beloep > 0
            select a.Beloep).Sum();
    }


    public async Task<Account> FetchAccount()
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetAsync("http://skbank.azurewebsites.net/api/transaksjon");
            var responseBody = await response.Content.ReadAsStringAsync();
            
            // Console.WriteLine(responseBody);
            return JsonSerializer.Deserialize<Account>(responseBody, new JsonSerializerOptions {PropertyNameCaseInsensitive = true});
        }
    }

    public async Task<List<Category>> FetchCategory()
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetAsync("http://skbank.azurewebsites.net/api/kategori");
            var responseBody = await response.Content.ReadAsStringAsync();
            
            // Console.WriteLine(responseBody);
            return JsonSerializer.Deserialize<List<Category>>(responseBody, new JsonSerializerOptions {PropertyNameCaseInsensitive = true});
        }
    }

}


