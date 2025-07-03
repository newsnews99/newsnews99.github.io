<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Federation Sun RSS Feed</title>
        <style>
          body {
            background: #1e1e1e;
            color: white;
            font-family: 'Bebas Neue', sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
          }
          h1 {
            text-align: center;
            margin-bottom: 30px;
          }
          .home-link {
            text-align: center;
            margin-bottom: 40px;
          }
          .home-link a {
            color: gold;
            text-decoration: none;
            font-size: 18px;
          }
          .home-link a:hover {
            text-decoration: underline;
          }
          .item {
            border-bottom: 1px solid #333;
            padding: 10px 0;
          }
          .item a {
            color: gold;
            font-size: 20px;
            text-decoration: none;
          }
          .item a:hover {
            text-decoration: underline;
          }
          .date {
            font-size: 14px;
            color: #ccc;
          }
        </style>
      </head>
      <body>
        <h1>Federation Sun RSS Feed</h1>
        <div class="home-link">
          <a href="https://fedsun.news">← Back to Home</a>
        </div>
        <xsl:for-each select="rss/channel/item">
          <div class="item">
            <a href="{link}">
              <xsl:value-of select="title"/>
            </a>
            <div class="date">
              <xsl:value-of select="pubDate"/>
            </div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
