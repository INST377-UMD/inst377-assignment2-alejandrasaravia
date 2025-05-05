document.addEventListener("DOMContentLoaded", () => {
    const stockForm = document.getElementById("stock-form");
    const stockChartCanvas = document.getElementById("stock-chart");
    const topStocksTable = document.getElementById("top-stocks").querySelector("tbody");

    let stockChart = new Chart(stockChartCanvas, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Stock Price",
            data: [],
            borderColor: "lightblue",
            backgroundColor: "rgba(173, 216, 230, 0.2)",
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: {
            title: { display: true, text: "Date" },
            grid: {
              color: "#e0e0e0",
            },
          },
          y: {
            title: { display: true, text: "Price (USD)" },
            grid: {
              color: "#e0e0e0",
            },
          },
        },
        layout: {
          padding: 10,
        },
      },
    });

    stockForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ticker = document.getElementById("stock-ticker").value.toUpperCase();
      const range = document.getElementById("date-range").value;
 
      fetchStockData(ticker, range);
    });

    async function fetchStockData(ticker, range) {
      const apiKey = "pjBRjcDnL97FLvE6ROJ3Lcd5dS3hYNkU";
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - parseInt(range));
      const start = startDate.toISOString().split("T")[0];
      const end = today.toISOString().split("T")[0];
 
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=${apiKey}`;
 
      try {
        const response = await fetch(url);
        const data = await response.json();
 
        if (data.results && data.results.length > 0) {
          const labels = data.results.map((entry) =>
            new Date(entry.t).toLocaleDateString()
          );
          const prices = data.results.map((entry) => entry.c);
 
          updateChart(labels, prices);
        } else {
          alert("No data found for this ticker.");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }

    function updateChart(labels, data) {
      stockChart.data.labels = labels;
      stockChart.data.datasets[0].data = data;
      stockChart.update();
    }

    async function fetchTopStocks() {
        const url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
        try {
          const response = await fetch(url);
          const data = await response.json();
     
          const topStocks = data.slice(0, 5);
          topStocksTable.innerHTML = "";

          topStocks.forEach((stock) => {
            const sentimentIcons = {
              Bullish: {
                icon: "https://cdn.vectorstock.com/i/1000v/51/91/bull-logo-business-icon-on-a-white-background-vector-13795191.jpg",
                trend: "https://media.istockphoto.com/id/1404033274/vector/simple-rising-polygonal-arrow.jpg?s=612x612&w=0&k=20&c=JzJIJ7dFCj4PCebVmMvJAms3NVk88xa2OetqTjtTFiQ=",
              },
              Bearish: {
                icon: "https://cdn-icons-png.flaticon.com/512/185/185736.png",
                trend: "https://www.shutterstock.com/image-vector/drop-arrow-business-market-crisis-600nw-2251947691.jpg",
              },
            };
         
            const sentiment = stock.sentiment;
            const sentimentInfo = sentimentIcons[sentiment] || { icon: "", trend: "" };
         
            const row = `
              <tr>
                <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
                <td>${stock.comment_count !== null && stock.comment_count !== undefined ? stock.comment_count : "0"}</td>
                <td style="text-align: center;">
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="${sentimentInfo.trend}" alt="${sentiment} Trend" width="40" />
                    <img src="${sentimentInfo.icon}" alt="${sentiment}" width="60" />
                  </div>
                </td>
              </tr>`;
            topStocksTable.insertAdjacentHTML("beforeend", row);
          });          
        } catch (error) {
          console.error("Error fetching top stocks:", error);
        }
      }
     
    fetchTopStocks();
  });
