<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Federation Sun RSS Feed</title>
        <style>
          body {
            background: #1e1e1e;
            color: white;
            font-family: 'Bebas Neue', sans-serif;
            margin: 0;
            padding: 40px;
          }
          h1 {
            text-align: center;
            font-size: 32px;
          }
          a.home-link {
            display: block;
            text-align: center;
            margin-bottom: 30px;
            color: white;
            text-decoration: none;
            font-size: 18px;
          }
          a.home-link:hover {
            color: gold;
          }
          .item {
            border-bottom: 1px solid #444;
            padding: 20px 0;
          }
          .title {
            font-size: 20px;
            color: gold;
            text-decoration: none;
          }
          .pubDate {
            font-size: 14px;
            color: #ccc;
          }
        </style>
      </head>
      <body>
        <h1>FEDERATION SUN RSS FEED</h1>
        <a class="home-link" href="https://fedsun.news">← Back to Homepage</a>
        <xsl:for-each select="rss/channel/item">
          <div class="item">
            <a class="title">
              <xsl:attribute name="href">
                <xsl:value-of select="link"/>
              </xsl:attribute>
              <xsl:value-of select="title"/>
            </a>
            <div class="pubDate">
              <xsl:value-of select="pubDate"/>
            </div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
