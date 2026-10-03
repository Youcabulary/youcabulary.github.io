import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:youcabulary/domain/models.dart';
import 'package:youcabulary/l10n/ui_evolution.dart';
import 'package:youcabulary/domain/srs/srs_state.dart';
import 'package:youcabulary/ui/study/card_preview_screen.dart';
import 'package:youcabulary/ui/theme.dart';
import 'package:youcabulary/l10n/generated/app_localizations.dart';

void main() {
  testWidgets('Capture actual app card preview with sample vocabulary', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(390, 740);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.reset);
    for (final name in ['Roboto', 'Segoe UI']) {
      await (FontLoader(name)..addFont(
            Future.value(
              ByteData.sublistView(
                File('C:/Windows/Fonts/segoeui.ttf').readAsBytesSync(),
              ),
            ),
          ))
          .load();
    }
    await (FontLoader('Yu Gothic')..addFont(
          Future.value(
            ByteData.sublistView(
              File('C:/Windows/Fonts/YuGothM.ttc').readAsBytesSync(),
            ),
          ),
        ))
        .load();
    await (FontLoader(
      'MaterialIcons',
    )..addFont(rootBundle.load('fonts/MaterialIcons-Regular.otf'))).load();
    final now = DateTime.utc(2026, 10, 4);
    final boundary = GlobalKey();
    await tester.pumpWidget(
      MaterialApp(
        theme: youcabularyTheme().copyWith(
          platform: TargetPlatform.windows,
          textTheme: youcabularyTheme().textTheme.apply(
            fontFamily: 'Segoe UI',
            fontFamilyFallback: const ['Yu Gothic'],
          ),
        ),
        locale: const Locale('en'),
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
        home: UiLocaleScope(
          evolvedKeys: const {},
          catalog: null,
          evolutionEnabled: false,
          child: RepaintBoundary(
            key: boundary,
            child: CardPreviewScreen(
              locale: null,
              word: Word(
                id: 'website-sample',
                language: 'ja',
                written: '木漏れ日',
                reading: 'こもれび',
                definition: 'sunlight filtering through trees',
                srs: SrsState.newWord(now),
                createdAt: now,
                updatedAt: now,
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    for (final side in ['front', 'back']) {
      if (side == 'back') {
        await tester.tap(find.byKey(const ValueKey('preview-card')));
        await tester.pumpAndSettle();
      }
      expect(tester.takeException(), isNull);
      final render =
          boundary.currentContext!.findRenderObject()! as RenderRepaintBoundary;
      final cardRect = tester.getRect(find.byType(Card));
      await tester.runAsync(() async {
        final image = await (render.layer! as OffsetLayer).toImage(
          cardRect,
          pixelRatio: 2,
        );
        final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
        await File(
          'D:/Development/youcabulary.github.io/assets/app-card-$side.png',
        ).writeAsBytes(bytes!.buffer.asUint8List());
        image.dispose();
      });
    }
  });
}
