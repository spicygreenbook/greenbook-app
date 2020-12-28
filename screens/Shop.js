import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator, Linking} from 'react-native';
import { Link } from "../components/Link";
import { PageTitle } from "../components/PageTitle"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(
      getStyles("text_header2, text_header3, section, content, button_green, button_green_text", {
        isWeb,
      })
    );
    //console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(false);
    const [ content, setContent ] = useState(props.content || {});

    if (isWeb) {
        useEffect(() => {

          (function () {
            var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
            if (window.ShopifyBuy) {
              if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
              } else {
                loadScript();
              }
            } else {
              loadScript();
            }
            function loadScript() {
              var script = document.createElement('script');
              script.async = true;
              script.src = scriptURL;
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
              script.onload = ShopifyBuyInit;
            }
            function ShopifyBuyInit() {
              var client = ShopifyBuy.buildClient({
                domain: 'spicy-green-book.myshopify.com',
                storefrontAccessToken: '177743c06fe67bbfed846d9b9bf958ee',
              });
              ShopifyBuy.UI.onReady(client).then(function (ui) {
                ui.createComponent('collection', {
                  id: '233557950630',
                  node: document.getElementById('collection-component-1609176709023'),
                  moneyFormat: '%24%7B%7Bamount%7D%7D',
                  options: {
            "product": {
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                    "width": "calc(25% - 20px)"
                  },
                  "img": {
                    "height": "calc(100% - 15px)",
                    "position": "absolute",
                    "left": "0",
                    "right": "0",
                    "top": "0"
                  },
                  "imgWrapper": {
                    "padding-top": "calc(75% + 15px)",
                    "position": "relative",
                    "height": "0"
                  }
                },
                "button": {
                  ":hover": {
                    "background-color": "#00582e"
                  },
                  "background-color": "#006233",
                  ":focus": {
                    "background-color": "#00582e"
                  }
                }
              },
              "text": {
                "button": "Add to cart"
              }
            },
            "productSet": {
              "styles": {
                "products": {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px"
                  }
                }
              }
            },
            "modalProduct": {
              "contents": {
                "img": false,
                "imgWithCarousel": true,
                "button": false,
                "buttonWithQuantity": true
              },
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px"
                  }
                },
                "button": {
                  ":hover": {
                    "background-color": "#00582e"
                  },
                  "background-color": "#006233",
                  ":focus": {
                    "background-color": "#00582e"
                  }
                }
              },
              "text": {
                "button": "Add to cart"
              }
            },
            "cart": {
              "styles": {
                "button": {
                  ":hover": {
                    "background-color": "#00582e"
                  },
                  "background-color": "#006233",
                  ":focus": {
                    "background-color": "#00582e"
                  }
                }
              },
              "text": {
                "total": "Subtotal",
                "button": "Checkout"
              }
            },
            "toggle": {
              "styles": {
                "toggle": {
                  "background-color": "#006233",
                  ":hover": {
                    "background-color": "#00582e"
                  },
                  ":focus": {
                    "background-color": "#00582e"
                  }
                }
              }
            }
          },
                });
              });
            }
          })();

        }, [pageLoading])
    }


    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <PageTitle title={"Shop Our Merch"} />
{/*                <View style={[styles.section, {paddingBottom: isWeb ? 0 : 80}]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                        {!isWeb && <Link style={{marginTop: 40}} href={'https://spicygreenbook.org/contact'} button={'button_green'} title="Go To Contact Form" />}
                    </View>
                </View>
*/}
                {isWeb && <View style={[styles.section]}>
                    <View style={styles.content}>
                        <div id='collection-component-1609092145121'></div>
                    </View>
                </View>}
                {!isWeb && 
                    <View style={[styles.section]}>
                        <Link href="https://spicygreenbook.org/shop" contain onPress={() => Linking.openURL('https://spicygreenbook.org/shop')} >
                            <View style={[styles.button_green, { marginTop: 40 }]} >    
                                <Text style={[styles.button_green_text]}>Go To Online Store</Text>
                            </View>
                        </Link>
                    </View>
                }
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;