const pdf_generator = ({fullname, facts = []}) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;0,700;1,200;1,300&display=swap');

            * {
                font-family: 'Jost', sans-serif;
            }

            h1, h2, h3 {
              font-weight: 300;
              margin: 1rem 0rem;
            }
            
            h4 {
              color: #8a8a8a;
              font-weight: 300;
              margin: 0.5rem 0rem;
            }            

            .items {
              display: flex;
              position: relative;
              align-items: center;
              justify-content: space-around;
              flex-direction: row;
              flex-wrap: wrap;
              margin: 0.5rem 0rem;
              width: 80%;
            }
            
            .half {
                width: 50%;
            }
            
            .items:hover {
                cursor: pointer;
            }
            
            .item {
              display: flex;
              position: relative;
              justify-content: space-around;
              flex-wrap: wrap;
              align-items: center;
              text-align: center;
              flex-direction: column;
              border: none;
              user-select: none;
              cursor: pointer;
            }
            
            .label {
              font-size: 1.1rem;
              font-weight: 300;
              width: min(50%, 12rem);
              height: min(100%, 10rem);
              color:#8a8a8a;
              box-shadow: 0px 0px 1px 0px #8a8a8a;
              padding: 0.25rem 0.5rem;
              margin: 1rem 0.5rem;
            }
            
            .active_l, .label:hover {
              box-shadow: 0px 0px 2px 0px #0c88c2;
            }
            
            .card {
              font-size: 1.2rem;
              font-weight: 500;
              width: min(100%, 14rem);
              height: min(100%, 7rem);
              color: #181C1F;
              border-radius: 0.25rem;
              box-shadow: 0px 0px 2px 0px #229ED9;
              padding: 0.5rem 0rem;
              margin: 1rem 0.5rem;
            }
            
            .active, .card:hover {
              box-shadow: 0px 0px 3px 1px #229ED9;
              transition: 0.1s ease-in-out;
            }
          </style>
       </head>
            <body>        
                <h3>Fullname: ${fullname}</h3>
                    
                <h3>Facts (Truth or False?)</h3>
                <div class="items_half">
                    ${facts.map(el => `
                        <div class="item card">
                            <b>${el.content}</b>
                        </div>
                    `)}
                </div>
            </body>
        </html>
    `
}

module.exports = pdf_generator