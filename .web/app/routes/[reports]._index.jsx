import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Text as RadixThemesText} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import {jsx} from "@emotion/react"




function Button_ecfe64b414e1287c896d227f67eebee0 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_1f04157810394871f81181b9aa57ad82 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___reports____report_state.refresh_reports", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_1f04157810394871f81181b9aa57ad82,variant:"outline"},"Refresh")
  )
}


function Heading_e6712f315efa5b4f18391ef2dbe1428c () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{size:"7"},(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_invoices"]) ? reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_invoices"] : 0))
  )
}


function Heading_7ee0d584ad86cc08f3ba3658d1e39147 () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "green.600" }),size:"7"},("\u20b9 "+(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_sales"]) ? reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_sales"] : 0)))
  )
}


function Heading_bfe1f8cd7411a151dd773608f3bde229 () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "blue.600" }),size:"7"},("\u20b9 "+(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_paid"]) ? reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_paid"] : 0)))
  )
}


function Heading_88bdcb39d5d5369f594ead728bd358e8 () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "orange.600" }),size:"7"},("\u20b9 "+(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_outstanding"]) ? reflex___state____state__state____global_state__pages___reports____report_state.sales_report_rx_state_?.["total_outstanding"] : 0)))
  )
}


function Heading_33a6cdd3af685cebdebf449c891819c6 () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{size:"7"},(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_invoices"]) ? reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_invoices"] : 0))
  )
}


function Heading_5cf456bd297e08b4a896a9b3a96629c7 () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "red.600" }),size:"7"},("\u20b9 "+(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_purchases"]) ? reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_purchases"] : 0)))
  )
}


function Heading_13696de586a6fd54d3021862b1d2a29e () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "blue.600" }),size:"7"},("\u20b9 "+(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_paid"]) ? reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_paid"] : 0)))
  )
}


function Heading_ce33d3f71d31f253897dc7448be2f2c9 () {
  const reflex___state____state__state____global_state__pages___reports____report_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "orange.600" }),size:"7"},("\u20b9 "+(isTrue(reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_outstanding"]) ? reflex___state____state__state____global_state__pages___reports____report_state.purchase_report_rx_state_?.["total_outstanding"] : 0)))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Reports & Analytics"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_ecfe64b414e1287c896d227f67eebee0,{},)),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "4" }),size:"6"},"Sales Report"),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"4"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Invoices"),jsx(Heading_e6712f315efa5b4f18391ef2dbe1428c,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Sales"),jsx(Heading_7ee0d584ad86cc08f3ba3658d1e39147,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Paid"),jsx(Heading_bfe1f8cd7411a151dd773608f3bde229,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Outstanding"),jsx(Heading_88bdcb39d5d5369f594ead728bd358e8,{},))))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "4" }),size:"6"},"Purchase Report"),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"4"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Invoices"),jsx(Heading_33a6cdd3af685cebdebf449c891819c6,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Purchases"),jsx(Heading_5cf456bd297e08b4a896a9b3a96629c7,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Paid"),jsx(Heading_13696de586a6fd54d3021862b1d2a29e,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Outstanding"),jsx(Heading_ce33d3f71d31f253897dc7448be2f2c9,{},))))),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["fontStyle"] : "italic", ["marginTop"] : "4" }),size:"2"},"Note: Detailed reports with date filters, GST reports, and export functionality will be added in future updates.")))),jsx("title",{},"Reports - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}