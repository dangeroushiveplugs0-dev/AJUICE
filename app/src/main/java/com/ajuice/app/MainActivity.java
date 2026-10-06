package com.ajuice.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public final class MainActivity extends Activity {
  private WebView view;
  @Override public void onCreate(Bundle state) {
    super.onCreate(state);
    hideSystemUi();
    view = new WebView(this);
    WebSettings s = view.getSettings();
    s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true); s.setAllowFileAccess(true);
    view.setWebViewClient(new WebViewClient());
    view.setOverScrollMode(View.OVER_SCROLL_NEVER);
    view.loadUrl("file:///android_asset/index.html");
    setContentView(view);
  }
  private void hideSystemUi() { getWindow().getDecorView().setSystemUiVisibility(5894); }
  @Override public void onWindowFocusChanged(boolean focus) { super.onWindowFocusChanged(focus); if (focus) hideSystemUi(); }
}